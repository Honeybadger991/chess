export const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
export const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const GRID_SIZE = 100;

export interface Position{
    x: number;
    y: number;
}

export interface Piece{
    img?: string;
    position: Position;
    type: PieceType;
    team: TeamType;
    enPassant?: boolean;
    possibleMoves?: Position[];
}

export function samePosition (p1: Position, p2: Position){
    return p1.x === p2.x && p1.y === p2.y;
}

export enum PieceType{
    PAWN,
    KNIGHT,
    BISHOP,
    ROOK,
    QUEEN,
    KING
}

export enum TeamType{
    OPPONENT,
    ALLY
}



export const initialBoardState: Piece[] = [
    {img: `assets/rook-b.png`, position: {x: 0, y: 7}, type: PieceType.ROOK, team: TeamType.OPPONENT},
    {img: `assets/rook-b.png`, position: {x: 7, y: 7}, type: PieceType.ROOK, team: TeamType.OPPONENT},
    {img: `assets/knight-b.png`, position: {x: 1, y: 7}, type: PieceType.KNIGHT, team: TeamType.OPPONENT},
    {img: `assets/knight-b.png`, position: {x: 6, y: 7}, type: PieceType.KNIGHT, team: TeamType.OPPONENT},
    {img: `assets/bishop-b.png`, position: {x: 2, y: 7}, type: PieceType.BISHOP, team: TeamType.OPPONENT},
    {img: `assets/bishop-b.png`, position: {x: 5, y: 7}, type: PieceType.BISHOP, team: TeamType.OPPONENT},
    {img: `assets/queen-b.png`, position: {x: 3, y: 7}, type: PieceType.QUEEN, team: TeamType.OPPONENT},
    {img: `assets/king-b.png`, position: {x: 4, y: 7}, type: PieceType.KING, team: TeamType.OPPONENT},
    {img: 'assets/pawn-b.png', position: {x: 0, y: 6}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img: 'assets/pawn-b.png', position: {x: 1, y: 6}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img: 'assets/pawn-b.png', position: {x: 2, y: 6}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img: 'assets/pawn-b.png', position: {x: 3, y: 6}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img: 'assets/pawn-b.png', position: {x: 4, y: 6}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img: 'assets/pawn-b.png', position: {x: 5, y: 6}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img: 'assets/pawn-b.png', position: {x: 6, y: 6}, type: PieceType.PAWN, team: TeamType.OPPONENT},
    {img: 'assets/pawn-b.png', position: {x: 7, y: 6}, type: PieceType.PAWN, team: TeamType.OPPONENT},

    {img: `assets/rook-w.png`, position: {x: 0, y: 0}, type: PieceType.ROOK, team: TeamType.ALLY},
    {img: `assets/rook-w.png`, position: {x: 7, y: 0}, type: PieceType.ROOK, team: TeamType.ALLY},
    {img: `assets/knight-w.png`, position: {x: 1, y: 0}, type: PieceType.KNIGHT, team: TeamType.ALLY},
    {img: `assets/knight-w.png`, position: {x: 6, y: 0}, type: PieceType.KNIGHT, team: TeamType.ALLY},
    {img: `assets/bishop-w.png`, position: {x: 2, y: 0}, type: PieceType.BISHOP, team: TeamType.ALLY},
    {img: `assets/bishop-w.png`, position: {x: 5, y: 0}, type: PieceType.BISHOP, team: TeamType.ALLY},
    {img: `assets/queen-w.png`, position: {x: 3, y: 0}, type: PieceType.QUEEN, team: TeamType.ALLY},
    {img: `assets/king-w.png`, position: {x: 4, y: 0}, type: PieceType.KING, team: TeamType.ALLY},
    {img: 'assets/pawn-w.png', position: {x: 0, y: 1}, type: PieceType.PAWN, team: TeamType.ALLY},
    {img: 'assets/pawn-w.png', position: {x: 1, y: 1}, type: PieceType.PAWN, team: TeamType.ALLY},
    {img: 'assets/pawn-w.png', position: {x: 2, y: 1}, type: PieceType.PAWN, team: TeamType.ALLY},
    {img: 'assets/pawn-w.png', position: {x: 3, y: 1}, type: PieceType.PAWN, team: TeamType.ALLY},
    {img: 'assets/pawn-w.png', position: {x: 4, y: 1}, type: PieceType.PAWN, team: TeamType.ALLY},
    {img: 'assets/pawn-w.png', position: {x: 5, y: 1}, type: PieceType.PAWN, team: TeamType.ALLY},
    {img: 'assets/pawn-w.png', position: {x: 6, y: 1}, type: PieceType.PAWN, team: TeamType.ALLY},
    {img: 'assets/pawn-w.png', position: {x: 7, y: 1}, type: PieceType.PAWN, team: TeamType.ALLY},
]