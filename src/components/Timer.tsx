import { useRef, useState, useEffect } from 'react';
import { TeamType } from '../Types';
import { Board } from "../models/Board";
interface ITimer{
    t: number | null; 
    turn: number;
    team: TeamType;
    board: Board;
    setBoard: Function;
    setGameOver: Function;
}
const Timer = ({t, turn, team, board, setBoard, setGameOver}: ITimer) => {
    const [time, setTime] = useState<number | null>(t);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    const teamTurn = team === TeamType.OPPONENT ? 0 : 1;
    const winTeam = team === TeamType.OPPONENT ? 'white': 'black';

    useEffect(() => {
        setTime(t);
        // eslint-disable-next-line
    }, [t])


    useEffect(() => {
        if(time !== null && time !== Infinity){
            if((turn+2)%2 === teamTurn){
                startTimer();
            } else {
                stopTimer();
            }
        }
        return () => {
            stopTimer();
        }
    // eslint-disable-next-line
    }, [turn, time])

    useEffect(() => {
        if(time !== null && time !== Infinity && time <= 0){
            loseByTime();
        }
        return () => {
            stopTimer();
        }
        // eslint-disable-next-line
    }, [time])

    useEffect(() => {
        if(board.winningTeam){
            stopTimer();
        }
        return () => {
            stopTimer();
        }
        // eslint-disable-next-line
    }, [board.winningTeam])

    const startTimer = () => {
        timer.current = setInterval(() => {
            setTime(pt => pt as number-1);
        }, 1000)
        
    }

    const stopTimer = () => {
        if(timer.current){
            clearInterval(timer.current);
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60 < 10 ? '0'+ time % 60: time % 60;
        return `${minutes}:${seconds}`;
    };

    const loseByTime = () => {
        stopTimer();
        setBoard({...board, winningTeam: winTeam});
        setGameOver(true);
    }

    return (
        <div className="timer" style={(team === TeamType.OPPONENT && (turn+2)%2 !== 0) ||
        (team === TeamType.ALLY && (turn+2)%2 === 0) ? {backgroundColor: '#9FA7A7'} : 
        {backgroundColor: '#261B2B'}}>{time === null ? '...' : time === Infinity ? '∞' : formatTime(time)}</div>
    )
}

export default Timer