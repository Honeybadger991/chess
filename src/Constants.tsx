import { Piece } from "./models/Pieces";
import { Pawn } from "./models/Pawn";
import { Position } from "./models/Position";
import { PieceType, TeamType } from "./Types";
import { Board } from "./models/Board";

export const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
export const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const GRID_SIZE = 75;
export const BOARD_SIZE = 600;


export const initialBoard = new Board([
    new Piece (new Position(0, 0), PieceType.ROOK, TeamType.ALLY, 5, false),
    new Piece (new Position(7, 0), PieceType.ROOK, TeamType.ALLY, 5, false),
    new Piece (new Position(1, 0), PieceType.KNIGHT, TeamType.ALLY, 3, false),
    new Piece (new Position(6, 0), PieceType.KNIGHT, TeamType.ALLY, 3, false),
    new Piece (new Position(2, 0), PieceType.BISHOP, TeamType.ALLY, 3.1, false),
    new Piece (new Position(5, 0), PieceType.BISHOP, TeamType.ALLY, 3.1, false),
    new Piece (new Position(3, 0), PieceType.QUEEN, TeamType.ALLY, 9, false),
    new Piece (new Position(4, 0), PieceType.KING, TeamType.ALLY, 0, false),
    new Pawn (new Position(0, 1), TeamType.ALLY, 1, false),
    new Pawn (new Position(1, 1), TeamType.ALLY, 1, false),
    new Pawn (new Position(2, 1), TeamType.ALLY, 1, false),
    new Pawn (new Position(3, 1), TeamType.ALLY, 1, false),
    new Pawn (new Position(4, 1), TeamType.ALLY, 1, false),
    new Pawn (new Position(5, 1), TeamType.ALLY, 1, false),
    new Pawn (new Position(6, 1), TeamType.ALLY, 1, false),
    new Pawn (new Position(7, 1), TeamType.ALLY, 1, false),

    new Piece (new Position(0, 7), PieceType.ROOK, TeamType.OPPONENT, 5, false),
    new Piece (new Position(7, 7), PieceType.ROOK, TeamType.OPPONENT, 5, false),
    new Piece (new Position(1, 7), PieceType.KNIGHT, TeamType.OPPONENT, 3, false),
    new Piece (new Position(6, 7), PieceType.KNIGHT, TeamType.OPPONENT, 3, false),
    new Piece (new Position(2, 7), PieceType.BISHOP, TeamType.OPPONENT, 3.1, false),
    new Piece (new Position(5, 7), PieceType.BISHOP, TeamType.OPPONENT, 3.1, false),
    new Piece (new Position(3, 7), PieceType.QUEEN, TeamType.OPPONENT, 9, false),
    new Piece (new Position(4, 7), PieceType.KING, TeamType.OPPONENT, 0, false),
    new Pawn (new Position(0, 6), TeamType.OPPONENT, 1, false),
    new Pawn (new Position(1, 6), TeamType.OPPONENT, 1, false),
    new Pawn (new Position(2, 6), TeamType.OPPONENT, 1, false),
    new Pawn (new Position(3, 6), TeamType.OPPONENT, 1, false),
    new Pawn (new Position(4, 6), TeamType.OPPONENT, 1, false),
    new Pawn (new Position(5, 6), TeamType.OPPONENT, 1, false),
    new Pawn (new Position(6, 6), TeamType.OPPONENT, 1, false),
    new Pawn (new Position(7, 6), TeamType.OPPONENT, 1, false),
], 1);

initialBoard.calculateAllMoves();