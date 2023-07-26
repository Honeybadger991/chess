import { initialBoard } from "../Constants";
interface gameOverModalProp{
    gameOver: boolean;
    setGameOver: Function;
    winningTeam: string;
    setBoard: Function;
}

const GameOverModal = ({gameOver, setGameOver, winningTeam, setBoard}: gameOverModalProp) => {

    const handlePlayAgain = () => {
        setGameOver(false);
        setBoard(initialBoard.clone())
    }

    return (
        <div className={gameOver ? 'modal active' : 'modal'}>
            <div className={gameOver ? 'modal-content active' : 'modal-content'}>
                <div className="game-over-wrapper">
                    <h1 className="game-over-text">{winningTeam === 'draw' ? winningTeam : `${winningTeam} wins!`}</h1>
                    <button onClick={handlePlayAgain} className="game-over-btn">Play again</button>
                </div>
            </div>
        </div>
    
    )
}

export default GameOverModal