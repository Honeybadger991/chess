import { TeamType, Piece, Position } from "../Constants";
import { verticalMoveAndAttack, horizontalMoveAndAttack, cellOccupied, cellOccupiedByOpponent } from "./Rules";

export const rookMoveAndAttack = (initialPosition: Position, desiredPosition: Position, boardState: Piece[], team: TeamType) => {
    if(initialPosition.x === desiredPosition.x){
        return verticalMoveAndAttack(initialPosition, desiredPosition, boardState, team) as boolean;
    }
    if(initialPosition.y === desiredPosition.y){
        return horizontalMoveAndAttack(initialPosition, desiredPosition, boardState, team) as boolean;
    }
    return false;
}

export const getPossibleRookMoves = (rook: Piece, boardState: Piece[]) => {
    const possibleMoves: Position[] = [];

    // Top movement
    for(let i = 1; i < 8; i++) {
      // Stop checking if move is outside of the board
        if(rook.position.y + i > 7) break;
        const destination: Position = ({x: rook.position.x, y: rook.position.y + i});

        if(!cellOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardState, rook.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom movement
    for(let i = 1; i < 8; i++) {
      // Stop checking if move is outside of the board
        if(rook.position.y - i < 0) break;

        const destination: Position = ({x: rook.position.x, y: rook.position.y - i});

        if(!cellOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardState, rook.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Left movement
    for(let i = 1; i < 8; i++) {
      // Stop checking if move is outside of the board
        if(rook.position.x - i < 0) break;

        const destination: Position = ({x: rook.position.x - i, y: rook.position.y});

        if(!cellOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardState, rook.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Right movement
    for(let i = 1; i < 8; i++) {
      // Stop checking if move is outside of the board
        if(rook.position.x + i > 7) break;

        const destination: Position = ({x: rook.position.x + i, y: rook.position.y});

        if(!cellOccupied(destination, boardState)) {
            possibleMoves.push(destination);
        } else if(cellOccupiedByOpponent(destination, boardState, rook.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    return possibleMoves;
  }