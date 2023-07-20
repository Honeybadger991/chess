import { MouseEvent, useRef, useState } from "react";
import Cell from "./Cell";
import { isValidMove, isEnPassantMove, getValidMoves } from "../rules/Rules";
import { PieceType, TeamType, Piece, initialBoardState, Position, GRID_SIZE, samePosition } from "../Constants";
import Modal from "./Modal";



const Chessboard = () => {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const [grabPosition, setGrabPosition] = useState<Position>({x: -1, y: -1});
    const [modal, setModal] = useState<boolean>(false);
    const [promotionPawn, setPromotionPawn] = useState<Piece>()

    const chessboardRef = useRef<HTMLDivElement>(null);

    const updatePossibleMoves = () => {
        setPieces(currentPieces => {
            return currentPieces.map(p => {
                p.possibleMoves = getValidMoves(p, p.type, p.team, currentPieces);
                return p;
            });
        });
    }

    const grabPiece = (e: MouseEvent) => {
        updatePossibleMoves()
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current
        if (element.classList.contains('chess-piece') && chessboard){

            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));

            setGrabPosition({x: grabX,  y: grabY});

            const x = e.clientX - GRID_SIZE * 0.5;
            const y = e.clientY - GRID_SIZE * 0.5;
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }


    const movePiece = (e: MouseEvent) => {
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard){
            const minX = chessboard.offsetLeft - GRID_SIZE * 0.25;
            const minY = chessboard.offsetTop - GRID_SIZE * 0.2;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - GRID_SIZE * 0.75;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - GRID_SIZE * 0.8;
            const x = e.clientX - GRID_SIZE * 0.5;
            const y = e.clientY - GRID_SIZE * 0.5;
            activePiece.style.position = 'absolute';

            activePiece.style.left = minX > x ? `${minX}px` : activePiece.style.left = maxX < x ? `${maxX}px` : `${x}px`;
            activePiece.style.top = minY > y ? `${minY}px` : activePiece.style.top = maxY < y ? `${maxY}px` : `${y}px`;
        }
    }


    const dropPiece = (e: MouseEvent) => {

        const chessboard = chessboardRef.current;

        if(activePiece && chessboard){

            const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)) ;

            const currentPiece = pieces.find(p => samePosition(p.position, grabPosition));
            
            if (currentPiece){

                const validMove = isValidMove(grabPosition, {x, y}, currentPiece.type, currentPiece.team, pieces);

                const EnPassantMove = isEnPassantMove(grabPosition, {x, y}, currentPiece.team, pieces);
                
                const moveDirection = currentPiece.team === TeamType.ALLY ? 1 : -1;
                // UPDATE PIECE POSITION
                //AND IF A PIECE IIS ATTACKED - REMOVE IT
                if(EnPassantMove && currentPiece.type === PieceType.PAWN) {

                    const updatedPieces = pieces.reduce((results, p) => {
                        if(samePosition(p.position, grabPosition)){
                            p.enPassant = false;
                            p.position.x = x;
                            p.position.y = y;
                            results.push(p)
                        } else if (!samePosition(p.position, {x, y: y - moveDirection})) {
                            if(p.type === PieceType.PAWN){
                                p.enPassant = false;
                            }
                            results.push(p)
                        }
                        return results;
                    }, [] as Piece[]);
                    
                    setPieces(updatedPieces)
                } else if(validMove){

                    const updatedPieces = pieces.reduce((results, p) => {
                        if(samePosition(p.position, grabPosition)){
                            //ENPASSANT MOVE
                            p.enPassant = Math.abs(y - grabPosition.y) === 2 && p.type === PieceType.PAWN;
                            p.position.x = x;
                            p.position.y = y;

                            let promotedRow = p.team === TeamType.ALLY ? 7 : 0;
                            if(p.position.y === promotedRow && p.type === PieceType.PAWN){
                                setPromotionPawn(p)
                                setModal(true)
                            }
                            results.push(p)
                        } else if (!samePosition(p.position, {x, y})) {

                            if(p.type === PieceType.PAWN){
                                p.enPassant = false;
                            }
                            results.push(p)
                        }
                        return results;
                    }, [] as Piece[]);
                    
                    setPieces(updatedPieces)
                } else {
                // RESET PIECE POSITION
                    activePiece.style.position = 'relative';
                    activePiece.style.removeProperty('left');
                    activePiece.style.removeProperty('top');
                }

            }
            setActivePiece(null);
        }
    }

    let board = [];
    
    for (let i = 7; i >= 0; i--){
        for (let j = 0; j < 8; j++){
            const number = i+j;
            const piece = pieces.find(p => samePosition(p.position, {x:j, y:i}))
            const img = piece ? piece.img : undefined;
            let currentPiece = activePiece !== null ? pieces.find(p => samePosition(p.position, grabPosition)) : undefined;
            let highlight = currentPiece?.possibleMoves ? 
            currentPiece.possibleMoves.some(p => samePosition(p, {x: j, y: i})) : false;
            board.push(
                <Cell key={`${i}${j}`} img={img} number={number} highlight={highlight}/>
            )
        }
    }

    return (
        <>
            <div className="chessboard"
            onMouseDown={e => grabPiece(e)}
            onMouseMove={e => movePiece(e)}
            onMouseUp={e => dropPiece(e)}
            ref={chessboardRef}
            >{board}</div>
            <Modal modal={modal} setModal={setModal} promotionPawn={promotionPawn as Piece} pieces={pieces} setPieces={setPieces}/>
        </>
    )
}

export default Chessboard