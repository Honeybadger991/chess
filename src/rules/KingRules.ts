import { TeamType } from "../Types";
import { Piece, Position } from "../models";
import { cellIsEmptyOrOccupiedByOpponent, cellOccupied, cellOccupiedByOpponent } from "./Rules";

export const kingMoveAndAttack = (initialPosition: Position, desiredPosition: Position, boardState: Piece[], team: TeamType) => {
    if(
    ((initialPosition.x === desiredPosition.x + 1 || initialPosition.x === desiredPosition.x - 1 || initialPosition.x === desiredPosition.x) && 
    (initialPosition.y === desiredPosition.y + 1 || initialPosition.y === desiredPosition.y - 1 || initialPosition.y === desiredPosition.y))
    ){  
        if(cellIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)){
            return true;
        }
    } 
    return false;
}

export const getPossibleKingMoves = (king: Piece, boardstate: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];
  
    // Top movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position(king.position.x, king.position.y + i);
    
        // If the move is outside of the board don't add it
        if(destination.x < 0 || destination.x > 7 
            || destination.y < 0 || destination.y > 7) {
            break;
        }
    
        if (!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if (cellOccupiedByOpponent(destination, boardstate, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
  
    // Bottom movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position (king.position.x, king.position.y - i);
  
         // If the move is outside of the board don't add it
        if(destination.x < 0 || destination.x > 7 
            || destination.y < 0 || destination.y > 7) {
            break;
        }
    
        if (!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if (cellOccupiedByOpponent(destination, boardstate, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
        }
  
    // Left movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position (king.position.x - i, king.position.y);
  
        // If the move is outside of the board don't add it
        if(destination.x < 0 || destination.x > 7 
            || destination.y < 0 || destination.y > 7) {
            break;
        }
    
        if (!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if (cellOccupiedByOpponent(destination, boardstate, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
  
    // Right movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position (king.position.x + i, king.position.y);
  
        // If the move is outside of the board don't add it
        if(destination.x < 0 || destination.x > 7 
            || destination.y < 0 || destination.y > 7) {
            break;
        }
    
        if (!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if (cellOccupiedByOpponent(destination, boardstate, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
  
    // Upper right movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position (king.position.x + i, king.position.y + i);
  
        // If the move is outside of the board don't add it
        if(destination.x < 0 || destination.x > 7 
            || destination.y < 0 || destination.y > 7) {
            break;
        }
    
        if (!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if (cellOccupiedByOpponent(destination, boardstate, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
  
    // Bottom right movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position (king.position.x + i, king.position.y - i);
  
        // If the move is outside of the board don't add it
        if(destination.x < 0 || destination.x > 7 
            || destination.y < 0 || destination.y > 7) {
            break;
        }
    
        if (!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if (cellOccupiedByOpponent(destination, boardstate, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
  
    // Bottom left movement
    for (let i = 1; i < 2; i++) {
        const destination = new Position (king.position.x - i, king.position.y - i);
    
        // If the move is outside of the board don't add it
        if(destination.x < 0 || destination.x > 7 
            || destination.y < 0 || destination.y > 7) {
            break;
        }
    
        if (!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if (cellOccupiedByOpponent(destination, boardstate, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
  
    // Top left movement
    for (let i = 1; i < 2; i++) {
            const destination = new Position (king.position.x - i, king.position.y + i);
    
        // If the move is outside of the board don't add it
        if(destination.x < 0 || destination.x > 7 
            || destination.y < 0 || destination.y > 7) {
            break;
        }
      
        if (!cellOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if (cellOccupiedByOpponent(destination, boardstate, king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    return possibleMoves;
}

export const getCastlingMoves = (king: Piece, boardstate: Piece[]) => {
    const possibleMoves: Position[] = [];

    if (king.hasMoved) return possibleMoves;

    const rooks = boardstate.filter(p => p.isRook && p.team === king.team && !p.hasMoved)

    for (const rook of rooks){
        const direction = king.position.x > rook.position.x ? -1 : 1;

        const adjacentPosition = king.position.clone();

        adjacentPosition.x += direction;

        if(!rook.possibleMoves?.some(m => m.samePosition(adjacentPosition))) continue;


        //define cells required for castling
        const castlingCells = rook.possibleMoves.filter(m => m.y === king.position.y);

        const enemyPieces = boardstate.filter(p => p.team !== king.team);

        //define if enemy can hit castling cells
        if (enemyPieces.some(p => p.possibleMoves?.some(m => castlingCells.some(c => c.samePosition(m))))) continue;

        //define if enemy stand on castling cells
        if(enemyPieces.some(p => castlingCells.some(c => c.samePosition(p.position)))) continue;

        possibleMoves.push(rook.position.clone())
    }

    return possibleMoves;
}