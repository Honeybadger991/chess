import { TeamType } from "../Types";
import { Piece, Position } from "../models";
import { cellIsEmptyOrOccupiedByOpponent} from "./Rules";

export const knightMoveAndAttack = (initialPosition: Position, desiredPosition: Position, boardState: Piece[], team: TeamType) => {
    if(
    ((initialPosition.x === desiredPosition.x + 1 || initialPosition.x === desiredPosition.x - 1) && 
    (initialPosition.y === desiredPosition.y + 2 || initialPosition.y === desiredPosition.y - 2)) ||
    ((initialPosition.x === desiredPosition.x + 2 || initialPosition.x === desiredPosition.x - 2) && 
    (initialPosition.y === desiredPosition.y + 1 || initialPosition.y === desiredPosition.y - 1))
    ){  
        if(cellIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)){
            return true;
        }
    } 
    return false;
}

export const getPossibleKnightMoves = (knight: Piece, team: TeamType, boardState: Piece[]) => {
    const possibleMoves: Position[] = [];

    for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
            const verticalMove = new Position (knight.position.x + j, knight.position.y + i * 2);
            const horizontalMove = new Position (knight.position.x + i * 2, knight.position.y + j);
    
            if(cellIsEmptyOrOccupiedByOpponent(horizontalMove, boardState, team)){
                possibleMoves.push(horizontalMove)
            }
            if(cellIsEmptyOrOccupiedByOpponent(verticalMove, boardState, team)){
                possibleMoves.push(verticalMove)
            }
        }
    }   

    return possibleMoves;
}