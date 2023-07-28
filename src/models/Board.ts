import { PieceType, TeamType } from "../Types";
import { Piece, Position } from ".";
import { getPossiblePawnMoves } from '../rules/PawnRules';
import { getPossibleKnightMoves } from "../rules/KnightRules";
import { getPossibleBishopMoves } from "../rules/BishopRules";
import { getPossibleRookMoves } from "../rules/RookRules";
import { getPossibleQueenMoves } from "../rules/QueenRules";
import { getPossibleKingMoves, getCastlingMoves } from "../rules/KingRules";
import { Pawn } from "./Pawn";

export class Board{
    pieces: Piece[];
    totalTurns: number;
    winningTeam?: string;
    graveyard?: Piece[];

    constructor(pieces: Piece[], totalTurns: number){
        this.pieces = pieces;
        this.totalTurns = totalTurns;
    }


    get currentTeam(){
        return this.totalTurns % 2 === 1 ? TeamType.ALLY : TeamType.OPPONENT;
    }

    calculateAllMoves(){
        this.pieces.forEach(p => {
            p.possibleMoves = this.getValidMoves(p, this.pieces)
        });

        //include castling in kings moves
        for (const king of this.pieces.filter(p => p.isKing)) {
            if(king.possibleMoves === undefined) continue;

            king.possibleMoves = [...king.possibleMoves, ...getCastlingMoves(king, this.pieces)]
        }

        this.checkCurrentTeamMoves();

        //render possible moves only for current team
        this.pieces.filter(p => p.team !== this.currentTeam).forEach(p=> p.possibleMoves = []);

        //check if there are possible moves, otherwise checkmate/stalemate
        if(this.pieces.filter(p => p.team === this.currentTeam).some(p => p.possibleMoves !== undefined && 
        p.possibleMoves.length > 0)) return;

        //return all possible moves to define is it checkmate or stalemate
        this.pieces.forEach(p => {
            p.possibleMoves = this.getValidMoves(p, this.pieces);
        });

        const king = this.pieces.find(p => p.isKing && p.team === this.currentTeam);
        const checked = this.pieces.filter(p => p.team !== this.currentTeam && p.possibleMoves?.some(m => m.samePosition(king!.position)));
        this.winningTeam = checked.length < 1 ? 'draw' : this.currentTeam === TeamType.ALLY ? 'black' : 'white';
        
    };

    

    checkCurrentTeamMoves() {
        // Loop through all the current team's pieces
        for (const piece of this.pieces.filter(p => p.team === this.currentTeam)) {
            if (piece.possibleMoves === undefined) continue;

            // Simulate all the piece moves
            for (const move of piece.possibleMoves) {
                const simulatedBoard = this.clone();

                // Remove the piece at the destination position
                simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !p.samePosition(move));

                // Get the piece of the cloned board
                const clonedPiece = simulatedBoard.pieces.find(p => p.samePiecePosition(piece))!;
                clonedPiece.position = move.clone();

                // Get the king of the cloned board
                const clonedKing = simulatedBoard.pieces.find(p => p.isKing && p.team === simulatedBoard.currentTeam)!;

                // Loop through all enemy pieces, update their possible moves
                // And check if the current team's king will be in danger
                for (const enemy of simulatedBoard.pieces.filter(p => p.team !== simulatedBoard.currentTeam)) {
                    enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);

                    if (enemy.isPawn) {
                        if (enemy.possibleMoves.some(m => m.x !== enemy.position.x
                            && m.samePosition(clonedKing.position))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition(move));
                        }
                    } else {
                        if (enemy.possibleMoves.some(m => m.samePosition(clonedKing.position))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition(move));
                        }
                    }
                }
            }
        }
    }

    getValidMoves(piece: Piece,  boardState: Piece[]): Position[]{
        switch(piece.type){
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece, piece.team, boardState);
            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece, piece.team, boardState);
            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece, boardState);
            case PieceType.ROOK:
                return getPossibleRookMoves(piece, boardState);
            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece, boardState);
            case PieceType.KING:
                return getPossibleKingMoves(piece, boardState);
            default: return [];
        }
    }

    playMove(EnPassantMove: boolean, destination: Position, playedPiece: Piece, validMove: boolean): boolean{
        const moveDirection = playedPiece.team === TeamType.ALLY ? 1 : -1;
        const destinationPiece = this.pieces.find(p => p.samePosition(destination));

        //CASTLING LOGIC
        if(playedPiece.isKing && destinationPiece?.isRook && playedPiece.team === destinationPiece.team){
            const direction = playedPiece.position.x > destinationPiece.position.x ? -1 : 1;
            const newKingXPosition = playedPiece.position.x + (direction * 2);
            this.pieces = this.pieces.map(p => {
                if (p.samePiecePosition(playedPiece)){
                    p.position.x = newKingXPosition;
                } else if (p.samePiecePosition(destinationPiece)){
                    p.position.x = newKingXPosition - direction;
                }
                return p;
            });
            this.calculateAllMoves();
            return true;
        }
        if(EnPassantMove) {
            this.pieces = this.pieces.reduce((results, p) => {
                if(p.samePiecePosition(playedPiece)){
                    if(p.isPawn){
                        (p as Pawn).enPassant = false;
                    }
                    p.position.x = destination.x;
                    p.position.y = destination.y;
                    p.hasMoved = true;
                    results.push(p);
                } else if (!p.samePosition(new Position(destination.x, destination.y - moveDirection))) {
                    if(p.isPawn){
                        (p as Pawn).enPassant = false;
                    }
                    results.push(p);
                }
                return results;
            }, [] as Piece[]);
            this.calculateAllMoves();
        } else if(validMove){

            // if(destinationPiece && destinationPiece.team === this.currentTeam){
            //     this.graveyard.push(destinationPiece);
            //     console.log(this.graveyard);
            // }

            this.pieces = this.pieces.reduce((results, p) => {
                //peace that we moving
                if(p.samePiecePosition(playedPiece)){
                    //ENPASSANT MOVE
                    if(p.isPawn){
                        (p as Pawn).enPassant = Math.abs(destination.y - playedPiece.position.y) === 2 && p.type === PieceType.PAWN;
                    }

                    p.position.x = destination.x;
                    p.position.y = destination.y;
                    p.hasMoved = true;
                    results.push(p);
                } else if (!p.samePosition(destination)) {

                    if(p.isPawn){
                        (p as Pawn).enPassant = false;
                    }
                    results.push(p);
                }

                //piece at the destination location won't be pushed to results
                return results;
            }, [] as Piece[]);
            this.calculateAllMoves();
        } else {
        // RESET PIECE POSITION
            return false;
        }
        return true;
    }

    clone(): Board{
        const clonedPieces = this.pieces.map(p => p.clone());
        return new Board(clonedPieces, this.totalTurns);
    }
}