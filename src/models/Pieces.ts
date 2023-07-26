import { PieceType, TeamType } from "../Types";
import { Position } from "./Position";

export class Piece{
    img: string;
    position: Position;
    type: PieceType;
    team: TeamType;
    hasMoved: boolean;
    possibleMoves?: Position[];
    

    constructor(position: Position, type: PieceType, team: TeamType, hasMoved: boolean, possibleMoves: Position[] = []){
        this.img = `assets/${type}-${team}.png`;
        this.position = position;
        this.type = type;
        this.team = team;
        this.hasMoved = hasMoved;
        this.possibleMoves = possibleMoves;
    }

    get isPawn(): boolean{
        return this.type === PieceType.PAWN
    }

    get isRook(): boolean{
        return this.type === PieceType.ROOK
    }

    get isKnight(): boolean{
        return this.type === PieceType.KNIGHT
    }

    get isBishop(): boolean{
        return this.type === PieceType.BISHOP
    }

    get isQueen(): boolean{
        return this.type === PieceType.QUEEN
    }

    get isKing(): boolean{
        return this.type === PieceType.KING
    }

    samePiecePosition(otherPiece: Piece): boolean{
        return this.position.samePosition(otherPiece.position);
    }

    samePosition(otherPosition: Position): boolean{
        return this.position.samePosition(otherPosition);
    }

    clone(){
        return new Piece(this.position.clone(), this.type, this.team, this.hasMoved, this.possibleMoves?.map(m => m.clone()))
    }
}