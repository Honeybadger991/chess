import { TeamType, Piece, PieceType, Position, samePosition } from "../Constants";
import { cellOccupied, cellOccupiedByOpponent } from "./Rules";

export const pawnMoveAndAttack = (initialPosition: Position, desiredPosition: Position, boardState: Piece[], team: TeamType) => {
    const startRow = team === TeamType.ALLY ? 1 : 6;
    const moveDirection = team === TeamType.ALLY ? 1 : -1;

    //PAWN MOVEMENT LOGIC
    if(initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === moveDirection){  
        if(!cellOccupied(desiredPosition, boardState)){
            return true
        }
    } else if(initialPosition.y === startRow && initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === 2*moveDirection){
        if((!cellOccupied(desiredPosition, boardState) && (!cellOccupied({x: desiredPosition.x, y: desiredPosition.y - moveDirection}, boardState)))){
            return true
        }
    } 

    //PAWN ATTACK LOGIC
    else if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === moveDirection){
        if(cellOccupiedByOpponent(desiredPosition, boardState, team)){
            return true
        }
    } else if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === moveDirection){
        if(cellOccupiedByOpponent(desiredPosition, boardState, team)){
            return true
        }
    }
    return false;
}

export const getPossiblePawnMoves = (pawn: Piece, team: TeamType, boardState: Piece[]) => {
    const possibleMoves: Position[] = [];
    const startRow = pawn.team === TeamType.ALLY ? 1 : 6;
    const moveDirection = pawn.team === TeamType.ALLY ? 1 : -1;

    const normalMove: Position = ({x: pawn.position.x, y: pawn.position.y + moveDirection});
    const specialMove: Position = ({x: normalMove.x, y: normalMove.y + moveDirection});
    const upperLeftAttack: Position = ({x: pawn.position.x - 1, y: pawn.position.y + moveDirection});
    const upperRightAttack: Position = ({x: pawn.position.x + 1, y: pawn.position.y + moveDirection});
    const leftPosition: Position = ({x: pawn.position.x - 1, y: pawn.position.y});
    const rightPosition: Position = ({x: pawn.position.x + 1, y: pawn.position.y});

    if(!cellOccupied(normalMove, boardState)){
        possibleMoves.push(normalMove);
        if(pawn.position.y === startRow && !cellOccupied(specialMove, boardState)){
            possibleMoves.push(specialMove);
        }
    }

    if(cellOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)){
        possibleMoves.push(upperLeftAttack);
    } else if(!cellOccupied(upperLeftAttack, boardState)){
        const leftEnemyPawn = boardState.find(p => samePosition(p.position, leftPosition))
        if(leftEnemyPawn !=null && leftEnemyPawn.type === PieceType.PAWN && leftEnemyPawn.team !== team &&
            leftEnemyPawn.type === PieceType.PAWN && leftEnemyPawn.enPassant){
            possibleMoves.push(upperLeftAttack);
        }
    }

    if(cellOccupiedByOpponent(upperRightAttack, boardState, pawn.team)){
        possibleMoves.push(upperRightAttack);
    }else if(!cellOccupied(upperRightAttack, boardState)){
        const rightEnemyPawn = boardState.find(p => samePosition(p.position, rightPosition))
        if(rightEnemyPawn !=null && rightEnemyPawn.type === PieceType.PAWN && rightEnemyPawn.team !== team &&
            rightEnemyPawn.type === PieceType.PAWN && rightEnemyPawn.enPassant){
            possibleMoves.push(upperRightAttack);
        }
    }


    return possibleMoves;
}