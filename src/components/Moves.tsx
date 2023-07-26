import { useState } from "react";
import { initialBoard } from "../Constants";
import { PieceType, TeamType } from "../Types";
import { Piece, Position } from "../models";
import Chessboard from "./Chessboard";
import PromotePawnModal from "./PromotePawnModal";
import { Pawn } from "../models/Pawn";
import { Board } from "../models/Board";
import GameOverModal from "./GameOverModal";


const Moves = () => {

    const [board, setBoard] = useState<Board>(initialBoard.clone());
    const [modal, setModal] = useState<boolean>(false);
    const [promotionPawn, setPromotionPawn] = useState<Piece>();
    const [gameOver, setGameOver] = useState<boolean>(false);


    const playMove = (playedPiece: Piece, destination: Position): boolean => {
        if(playedPiece.possibleMoves === undefined) return false;

        //prevent playing in opponents turn
        if(playedPiece.team === TeamType.ALLY && board.totalTurns % 2 !== 1) return false;

        if(playedPiece.team === TeamType.OPPONENT && board.totalTurns % 2 !== 0) return false;

        let playedMoveIsValid = false;

        const validMove = playedPiece.possibleMoves.some(m => m.samePosition(destination));

        if(!validMove) return false;

        const EnPassantMove = isEnPassantMove(playedPiece.position, destination, playedPiece.team, playedPiece.type);
        //playing the move
        setBoard(() => {
            const clonedBoard = board.clone();

            clonedBoard.totalTurns += 1;

            playedMoveIsValid = clonedBoard.playMove(EnPassantMove, destination, playedPiece, validMove);

            if(clonedBoard.winningTeam){
                console.log(clonedBoard.winningTeam)
                setGameOver(true)
            }

            return clonedBoard;
        })
        //for pawn promoting
        let promotedRow = playedPiece.team === TeamType.ALLY ? 7 : 0;
        if(destination.y === promotedRow && playedPiece.isPawn){
            playedPiece.position = destination;
            setPromotionPawn(playedPiece)
            setModal(true)
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


    function promotePawn(pieceType: PieceType) {
        if (promotionPawn === undefined) {
            return;
        }

        setBoard(() => {
            const clonedBoard = board.clone();
            clonedBoard.pieces = clonedBoard.pieces.reduce((results: Piece[], piece: Piece) => {
                if (piece.samePiecePosition(promotionPawn)) {
                    results.push(new Piece(piece.position.clone(), pieceType,
                        piece.team, true, piece.possibleMoves?.map((m: Position) => m.clone())));
                } else {
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);

            clonedBoard.calculateAllMoves();
            
            return clonedBoard;
        })
    }


    function promotionTeamType() {
        return promotionPawn?.team === TeamType.ALLY ? "w" : "b";
    }



    return (
        <>
            <p className="turn">{board.totalTurns}</p>
            <Chessboard playMove={playMove} pieces={board.pieces}/>
            <PromotePawnModal modal={modal} setModal={setModal} promotePawn={promotePawn} promotionTeamType={promotionTeamType} />
            <GameOverModal gameOver={gameOver} setGameOver={setGameOver} winningTeam={board.winningTeam as string} setBoard={setBoard}/>
        </>
    )
}

export default Moves