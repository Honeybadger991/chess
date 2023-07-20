import { TeamType, Piece, Position } from "../Constants";
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
      const destination: Position = ({x: king.position.x, y: king.position.y + i});
  
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
        const destination: Position = ({x: king.position.x, y: king.position.y - i});
  
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
        const destination: Position = ({x: king.position.x - i, y: king.position.y});
  
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
        const destination: Position = ({x: king.position.x + i, y: king.position.y});
  
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
        const destination: Position = ({x: king.position.x + i, y: king.position.y + i});
  
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
        const destination: Position = ({x: king.position.x + i, y: king.position.y - i});
  
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
        const destination: Position = ({x: king.position.x - i, y: king.position.y - i});
  
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
        const destination: Position = ({x: king.position.x - i, y: king.position.y + i});
  
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