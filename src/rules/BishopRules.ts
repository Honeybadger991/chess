import { TeamType } from "../Types";
import { Piece, Position } from "../models";
import { cellOccupied, cellOccupiedByOpponent, diagonalMoveAndAttack } from "./Rules";

export const bishopMoveAndAttack = (initialPosition: Position, desiredPosition: Position, boardState: Piece[], team: TeamType) => {
    if(Math.abs(initialPosition.x - desiredPosition.x) === Math.abs(initialPosition.y - desiredPosition.y)){
        return diagonalMoveAndAttack(initialPosition, desiredPosition, boardState, team) as boolean;
    }
    return false;
}

export const getPossibleBishopMoves = (bishop: Piece, boardState: Piece[]) => {
    const possibleMoves: Position[] = [];

    // Upper right movement
    for(let i = 1; i < 8; i++) {
        const destination = new Position (bishop.position.x + i, bishop.position.y + i);

        if(!cellOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardState, bishop.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom right movement
    for(let i = 1; i < 8; i++) {
        const destination = new Position (bishop.position.x + i, bishop.position.y - i);

        if(!cellOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardState, bishop.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom left movement
    for(let i = 1; i < 8; i++) {
        const destination = new Position (bishop.position.x - i, bishop.position.y - i);

        if(!cellOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardState, bishop.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Top left movement
    for(let i = 1; i < 8; i++) {
        const destination = new Position (bishop.position.x - i, bishop.position.y + i);

        if(!cellOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardState, bishop.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    return possibleMoves;
  }