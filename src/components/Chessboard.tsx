import { MouseEvent, useRef, useState } from "react";
import Cell from "./Cell";
import { GRID_SIZE } from "../Constants";
import { Piece, Position } from "../models";

interface Props{
    playMove: (piece: Piece, position: Position) => boolean;
    pieces: Piece[];
}

const Chessboard = ({playMove, pieces}: Props) => {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabPosition, setGrabPosition] = useState<Position>(new Position(-1, -1));

    const chessboardRef = useRef<HTMLDivElement>(null);

    const grabPiece = (e: MouseEvent) => {
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current
        if (element.classList.contains('chess-piece') && chessboard){

            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));

            setGrabPosition(new Position(grabX, grabY));

            const x = e.clientX - GRID_SIZE * 0.5;
            const y = e.clientY - GRID_SIZE * 0.5;
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }


    const movePiece = (e: MouseEvent) => {
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard){
            const minX = chessboard.offsetLeft - GRID_SIZE * 0.25;
            const minY = chessboard.offsetTop - GRID_SIZE * 0.2;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - GRID_SIZE * 0.75;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - GRID_SIZE * 0.8;
            const x = e.clientX - GRID_SIZE * 0.5;
            const y = e.clientY - GRID_SIZE * 0.5;
            activePiece.style.position = 'absolute';

            activePiece.style.left = minX > x ? `${minX}px` : activePiece.style.left = maxX < x ? `${maxX}px` : `${x}px`;
            activePiece.style.top = minY > y ? `${minY}px` : activePiece.style.top = maxY < y ? `${maxY}px` : `${y}px`;
        }
    }


    const dropPiece = (e: MouseEvent) => {

        const chessboard = chessboardRef.current;

        if(activePiece && chessboard){

            const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)) ;

            const currentPiece = pieces.find(p => p.samePosition(grabPosition));
            
            if (currentPiece){
                var success = playMove(currentPiece.clone(), new Position(x, y));
                if(!success){
                    activePiece.style.position = 'relative';
                    activePiece.style.removeProperty('left');
                    activePiece.style.removeProperty('top');
                }
            } 
            setActivePiece(null);
        }
    }

    let board = [];
    
    for (let i = 7; i >= 0; i--){
        for (let j = 0; j < 8; j++){
            const number = i+j+2;
            const piece = pieces.find(p => p.samePosition(new Position(j, i)))
            const img = piece ? piece.img : undefined;
            let currentPiece = activePiece !== null ? pieces.find(p => p.samePosition(grabPosition)) : undefined;
            let highlight = currentPiece?.possibleMoves ? 
            currentPiece.possibleMoves.some(p => p.samePosition(new Position(j, i))) : false;
            board.push(
                <Cell key={`${i}${j}`} img={img} number={number} highlight={highlight}/>
            )
        }
    }

    return (
        <div className="chessboard"
        onMouseDown={e => grabPiece(e)}
        onMouseMove={e => movePiece(e)}
        onMouseUp={e => dropPiece(e)}
        ref={chessboardRef}
        >{board}</div>
    )
}

export default Chessboard