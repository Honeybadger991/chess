import { TeamType } from "../Types";
import { Piece, Position } from "../models";

export const cellOccupied = (position: Position, boardState: Piece[]): boolean => {
    const piece = boardState.find(p => p.samePosition(position));
    return piece ? true : false;
}

export const cellOccupiedByOpponent = (position: Position, boardState: Piece[], team: TeamType): boolean => {
    const piece = boardState.find(p => p.samePosition(position) && p.team !== team);
    return piece ? true : false;
}

export const cellIsEmptyOrOccupiedByOpponent = (position: Position, boardState: Piece[], team: TeamType): boolean => {
    return !cellOccupied(position, boardState) || cellOccupiedByOpponent(position, boardState, team);
}



export const diagonalMoveAndAttack = (initialPosition: Position, desiredPosition: Position, boardState: Piece[], team: TeamType) => {

    const dx = initialPosition.x < desiredPosition.x ? 1 : -1;
    const dy = initialPosition.y < desiredPosition.y ? 1 : -1;
    for(let i = 1; i < Math.abs(initialPosition.x - desiredPosition.x); i++){
        const x = initialPosition.x + i*dx;
        const y = initialPosition.y + i*dy;
        if(cellOccupied(new Position(x, y), boardState)){
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
        if(cellOccupied(new Position(initialPosition.x, y), boardState)){
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
        if(cellOccupied(new Position(x, initialPosition.y), boardState)){
            return false;
        }
    }
    if(cellIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)){
        return true;
    }
}
