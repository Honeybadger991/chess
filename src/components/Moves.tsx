import { useEffect, useState } from "react";
import { initialBoard, horizontalAxis, verticalAxis } from "../Constants";
import { PieceType, TeamType } from "../Types";
import { Piece, Position } from "../models";
import Chessboard from "./Chessboard";
import PromotePawnModal from "./PromotePawnModal";
import { Pawn } from "../models/Pawn";
import { Board } from "../models/Board";
import GameOverModal from "./GameOverModal";
import Timer from "./Timer";
import TimeLimitModal from "./TimeLimitModal";
import SurrenderModal from "./SurrenderModal";


const Moves = () => {

    interface HistoryObj{
        type: PieceType;
        from: Position;
        to: Position;
        castling?: boolean;
    }
    const [board, setBoard] = useState<Board>(initialBoard.clone());
    const [graveyard, setGraveyard] = useState<Piece[]>([]);
    const [history, setHistory] = useState<HistoryObj[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [promotionPawn, setPromotionPawn] = useState<Piece>();
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [timeLimit, setTimeLimit] = useState<number | null>(null);
    const [surrender, setSurrender] = useState<boolean>(false);


    useEffect(()=>{
        calculateAdvantage();
    // eslint-disable-next-line
    }, [board])

    const playMove = (playedPiece: Piece, destination: Position): boolean => {
        if(playedPiece.possibleMoves === undefined) return false;

        //prevent playing in opponents turn
        if(playedPiece.team === TeamType.ALLY && board.totalTurns % 2 !== 1) return false;

        if(playedPiece.team === TeamType.OPPONENT && board.totalTurns % 2 !== 0) return false;

        let playedMoveIsValid = false;

        const validMove = playedPiece.possibleMoves.some(m => m.samePosition(destination));

        if(!validMove) return false;

        const EnPassantMove = isEnPassantMove(playedPiece.position, destination, playedPiece.team, playedPiece.type);
        const moveDirection = playedPiece.team === TeamType.OPPONENT ? 1 : -1;
        const destinationPiece = EnPassantMove ? board.pieces.find(p => p.samePosition({x: destination.x, y: destination.y + moveDirection} as Position)) : board.pieces.find(p => p.samePosition(destination));

        //playing the move
        setBoard(() => {
            const clonedBoard = board.clone();

            clonedBoard.totalTurns += 1;

            playedMoveIsValid = clonedBoard.playMove(EnPassantMove, destination, playedPiece, validMove);

            if(clonedBoard.winningTeam){
                setGameOver(true);
            }

            return clonedBoard;
        })

        if(destinationPiece && playedPiece.type === PieceType.KING && destinationPiece.type === PieceType.ROOK &&
        playedPiece.team === destinationPiece.team){
            setHistory([...history, {type: playedPiece.type, from: playedPiece.position, to: destination, castling: true}]);
        } else setHistory([...history, {type: playedPiece.type, from: playedPiece.position, to: destination}]);
        
        //for pawn promoting
        let promotedRow = playedPiece.team === TeamType.ALLY ? 7 : 0;
        if(destination.y === promotedRow && playedPiece.isPawn){
            playedPiece.position = destination;
            setPromotionPawn(playedPiece);
            setModal(true);
        }


        //setting graveyard

        if(destinationPiece && destinationPiece.team !== playedPiece.team){
            setGraveyard([...graveyard, destinationPiece]);
        }
        
        
        return playedMoveIsValid;
    }


    const isEnPassantMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, type: PieceType): boolean =>{
        const moveDirection = team === TeamType.ALLY ? 1 : -1;

        if(type === PieceType.PAWN){
            if((desiredPosition.x - initialPosition.x === 1 || desiredPosition.x - initialPosition.x === -1) && 
            desiredPosition.y - initialPosition.y === moveDirection){
                const piece = board.pieces.find(p => 
                    p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - moveDirection && 
                    p.isPawn &&  (p as Pawn).enPassant
                )
                if(piece){
                    return true;
                }
            }
        }

        return false;
    }


    const promotePawn = (pieceType: PieceType, value: number) => {
        if (promotionPawn === undefined) {
            return;
        }

        setBoard(() => {
            const clonedBoard = board.clone();
            clonedBoard.pieces = clonedBoard.pieces.reduce((results: Piece[], piece: Piece) => {
                if (piece.samePiecePosition(promotionPawn)) {
                    results.push(new Piece(piece.position.clone(), pieceType,
                        piece.team, value, true, piece.possibleMoves?.map((m: Position) => m.clone())));
                } else {
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);

            clonedBoard.calculateAllMoves();
            
            return clonedBoard;
        })
    }


    const promotionTeamType = () => {
        return promotionPawn?.team === TeamType.ALLY ? "w" : "b";
    }


    const renderGraveyard = (team: TeamType) => {
        const filteredGraveyard = [...graveyard].sort((a, b) => {return a.value - b.value}).filter(p => p.team === team);
        return filteredGraveyard.map((p, i) => <div key={`${i}${team}`} className="graveyard-piece" style={{backgroundImage: `url(${p.img})`}}></div>);
    }

    const renderHistory = () => {
        return history.map((m, i) =>  !m.castling ? 
        <div key={i} className="history-move" 
        style={(i+1)%2 !== 0 ? {background: '#F2E0E0'} : {background: '#261B2B', color: '#fff'}}> 
        {m.type === 'king' ? 'ki' : m.type.slice(0, 1)}&nbsp; &nbsp;  
        {horizontalAxis[m.from.x]}{verticalAxis[m.from.y]}&nbsp;:&nbsp; 
        {horizontalAxis[m.to.x]}{verticalAxis[m.to.y]}
        </div> :
        <div key={i} className="history-move" 
        style={(i+1)%2 !== 0 ? {background: '#F2E0E0'} : {background: '#261B2B', color: '#fff'}}>
        {'ki'}&nbsp; &nbsp;  
        {m.to.x === 0 ? 'O--O' : 'O-O'}
        </div>)
    }

    const renderHistoryN = () => {
        return history.map((_, i) => (i+1)%2 !== 0 ? <div key={i}>{Math.ceil((i+1)/2)}.</div> : null);
        
    }

    const calculateAdvantage = () => {
        const whiteValue = Math.floor(board.pieces.filter(p => p.team === TeamType.ALLY).reduce((acc, p) => acc += p.value, 0));
        const blackValue = Math.floor(board.pieces.filter(p => p.team === TeamType.OPPONENT).reduce((acc, p) => acc += p.value, 0));
        return whiteValue - blackValue;
    }


    return (
        <>
            <div className="content-wrapper">
                <div className="main-wrapper">
                    <div className="main-info">
                        <Timer t={timeLimit} turn={board.totalTurns} team={TeamType.OPPONENT} board={board} setBoard={setBoard} setGameOver={setGameOver}/>
                        <div className="graveyard">{renderGraveyard(TeamType.ALLY)}</div>
                        <div className="advantage-container">
                            <div className="advantage" style={calculateAdvantage() >= 0 ? {display: 'none'} : {display: 'flex'}}>
                                +  {Math.abs(calculateAdvantage())}
                            </div>
                            <button disabled={(board.totalTurns+2)%2 === 1} onClick={() => setSurrender(true)} className="surrender">
                                <img src="assets/flag.svg" alt="icon" />
                            </button>
                        </div>
                    </div>
                    <Chessboard playMove={playMove} pieces={board.pieces}/>
                    <div className="main-info">
                        <Timer t={timeLimit} turn={board.totalTurns} team={TeamType.ALLY} board={board} setBoard={setBoard} setGameOver={setGameOver}/>
                        <div className="graveyard">{renderGraveyard(TeamType.OPPONENT)}</div>
                        <div className="advantage-container">
                            <div className="advantage" style={calculateAdvantage() <= 0 ? {display: 'none'} : {display: 'flex'}}>
                                + {calculateAdvantage()}
                            </div>
                            <button disabled={(board.totalTurns+2)%2 === 0} onClick={() => setSurrender(true)} className="surrender">
                                <img src="assets/flag.svg" alt="icon" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="history">
                    <div className="history-num">
                        <div></div>
                        {renderHistoryN()}
                    </div>
                    <div className="history-moves">
                        <h2 className="history-title-white">White</h2>
                        <h2 className="history-title-black">Black</h2>
                        {renderHistory()}
                    </div>
                </div>
            </div>
            <PromotePawnModal modal={modal} setModal={setModal} promotePawn={promotePawn} promotionTeamType={promotionTeamType} />
            <GameOverModal gameOver={gameOver} setGameOver={setGameOver} winningTeam={board.winningTeam as string}  setBoard={setBoard} setGraveyard={setGraveyard} setHistory={setHistory} setTimeLimit={setTimeLimit}/>
            <TimeLimitModal timeLimit={timeLimit} setTimeLimit={setTimeLimit}/>
            <SurrenderModal surrender={surrender} setSurrender={setSurrender} board={board} setBoard={setBoard} 
            setGameOver={setGameOver}/>
        </>
    )
}

export default Moves