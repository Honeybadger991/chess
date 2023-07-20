import { PieceType, TeamType, Piece, Position, samePosition } from "../Constants";
import { pawnMoveAndAttack, getPossiblePawnMoves } from "./PawnRules";
import { knightMoveAndAttack, getPossibleKnightMoves } from "./KnightRules";
import { bishopMoveAndAttack, getPossibleBishopMoves } from "./BishopRules";
import { rookMoveAndAttack, getPossibleRookMoves } from "./RookRules";
import { queenMoveAndAttack, getPossibleQueenMoves } from "./QueenRules";
import { kingMoveAndAttack, getPossibleKingMoves } from "./KingRules";

export const cellOccupied = (position: Position, boardState: Piece[]): boolean => {
    const piece = boardState.find(p => samePosition(p.position, position));
    return piece ? true : false;
}

export const cellOccupiedByOpponent = (position: Position, boardState: Piece[], team: TeamType): boolean => {
    const piece = boardState.find(p => samePosition(p.position, position) && p.team !== team);
    return piece ? true : false;
}

export const cellIsEmptyOrOccupiedByOpponent = (position: Position, boardState: Piece[], team: TeamType): boolean => {
    return !cellOccupied(position, boardState) || cellOccupiedByOpponent(position, boardState, team);
}


export const isEnPassantMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean =>{
    const moveDirection = team === TeamType.ALLY ? 1 : -1;

    if((desiredPosition.x - initialPosition.x === 1 || desiredPosition.x - initialPosition.x === -1) && 
    desiredPosition.y - initialPosition.y === moveDirection){
        const piece = boardState.find(p => 
            p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - moveDirection && p.enPassant
        )
        if(piece){
            return true;
        }
    }

    return false;
}


export const diagonalMoveAndAttack = (initialPosition: Position, desiredPosition: Position, boardState: Piece[], team: TeamType) => {

    const dx = initialPosition.x < desiredPosition.x ? 1 : -1;
    const dy = initialPosition.y < desiredPosition.y ? 1 : -1;
    for(let i = 1; i < Math.abs(initialPosition.x - desiredPosition.x); i++){
        const x = initialPosition.x + i*dx;
        const y = initialPosition.y + i*dy;
        if(cellOccupied({x, y}, boardState)){
            return false;
        }
    }
    if(cellIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)){
        return true;
    }
}

export const verticalMoveAndAttack = (initialPosition: Position, desiredPosition: Position, boardState: Piece[], team: TeamType) => {

    const min = Math.min(initialPosition.y, desiredPosition.y);
    const max = Math.max(initialPosition.y, desiredPosition.y);
    for (let y = min + 1; y < max; y++){
        if(cellOccupied({x: initialPosition.x, y}, boardState)){
            return false;
        }
    }
    if(cellIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)){
        return true;
    }
}

export const horizontalMoveAndAttack = (initialPosition: Position, desiredPosition: Position, boardState: Piece[], team: TeamType) =>{

    const min = Math.min(initialPosition.x, desiredPosition.x);
    const max = Math.max(initialPosition.x, desiredPosition.x);
    for (let x = min + 1; x < max; x++){
        if(cellOccupied({x, y: initialPosition.y}, boardState)){
            return false;
        }
    }
    if(cellIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)){
        return true;
    }
}


export const isValidMove = (
    initialPosition: Position, 
    desiredPosition: Position, 
    type: PieceType, 
    team: TeamType, 
    boardState: Piece[]
    ) => {
    switch(type){
        case PieceType.PAWN:
            return pawnMoveAndAttack(initialPosition, desiredPosition, boardState, team) as boolean;
        case PieceType.KNIGHT:
            return knightMoveAndAttack(initialPosition, desiredPosition, boardState, team) as boolean;
        case PieceType.BISHOP:
            return bishopMoveAndAttack(initialPosition, desiredPosition, boardState, team) as boolean;
        case PieceType.ROOK:
            return rookMoveAndAttack(initialPosition, desiredPosition, boardState, team) as boolean;
        case PieceType.QUEEN:
            return queenMoveAndAttack(initialPosition, desiredPosition, boardState, team) as boolean;
        case PieceType.KING:
            return kingMoveAndAttack(initialPosition, desiredPosition, boardState, team) as boolean;
        default: return false;
    }
}

export const getValidMoves = (piece: Piece, type: PieceType, team: TeamType,  boardState: Piece[]) => {
    switch(type){
        case PieceType.PAWN:
            return getPossiblePawnMoves(piece, team, boardState);
        case PieceType.KNIGHT:
            return getPossibleKnightMoves(piece, team, boardState);
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
