import { TeamType } from "../Types";
import { Piece, Position } from "../models";
import { verticalMoveAndAttack, horizontalMoveAndAttack, diagonalMoveAndAttack, cellOccupied, cellOccupiedByOpponent } from "./Rules";

export const queenMoveAndAttack = (initialPosition: Position, desiredPosition: Position, boardState: Piece[], team: TeamType) => {
    if(Math.abs(initialPosition.x - desiredPosition.x) === Math.abs(initialPosition.y - desiredPosition.y)){
        return diagonalMoveAndAttack(initialPosition, desiredPosition, boardState, team) as boolean;
    }
    if(initialPosition.x === desiredPosition.x){
        return verticalMoveAndAttack(initialPosition, desiredPosition, boardState, team) as boolean;
    }
    if(initialPosition.y === desiredPosition.y){
        return horizontalMoveAndAttack(initialPosition, desiredPosition, boardState, team) as boolean;
    }
    return false;
}

export const getPossibleQueenMoves = (queen: Piece, boardstate: Piece[]) => {
    const possibleMoves: Position[] = [];

    // Top movement
    for(let i = 1; i < 8; i++) {
        const destination = new Position(queen.position.x, queen.position.y + i);

        if(!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardstate, queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom movement
    for(let i = 1; i < 8; i++) {
        const destination = new Position(queen.position.x,queen.position.y - i);

        if(!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardstate, queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Left movement
    for(let i = 1; i < 8; i++) {
        const destination= new Position(queen.position.x - i,queen.position.y);

        if(!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardstate, queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Right movement
    for(let i = 1; i < 8; i++) {
        const destination= new Position(queen.position.x + i,queen.position.y);

        if(!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardstate, queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Upper right movement
    for(let i = 1; i < 8; i++) {
        const destination= new Position(queen.position.x + i,queen.position.y + i);

        if(!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardstate, queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom right movement
    for(let i = 1; i < 8; i++) {
        const destination= new Position(queen.position.x + i,queen.position.y - i);

        if(!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardstate, queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom left movement
    for(let i = 1; i < 8; i++) {
        const destination= new Position(queen.position.x - i,queen.position.y - i);

        if(!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardstate, queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Top left movement
    for(let i = 1; i < 8; i++) {
        const destination= new Position(queen.position.x - i,queen.position.y + i);

        if(!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardstate, queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    return possibleMoves;
  }