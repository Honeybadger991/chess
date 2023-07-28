import { Board } from "../models/Board";

interface SurrenderModalProp{
    surrender: boolean;
    setSurrender: Function;
    board: Board;
    setBoard: Function;
    setGameOver: Function;
}

const SurrenderModal = ({surrender, setSurrender, board, setBoard, setGameOver} : SurrenderModalProp) => {


    const team = (board.totalTurns+2)%2 === 0 ? 'white' : 'black';

    const handleSurrender = (team: string) => {
        setBoard({...board, winningTeam: team});
        setGameOver(true);
        setSurrender(false);
    }

    const handleCancel = () => {
        setSurrender(false);
    }

    return (
        <div className={surrender ? 'modal active' : 'modal'}>
            <div className={surrender ? 'modal-content active' : 'modal-content'}>
                <div className="surrender-wrapper">
                    <h2 className="surrender-text">Are you sure you want to give up?</h2>
                    <div className="surrender-btns">
                        <button onClick={() => handleSurrender(team)} className="surrender-btn surrender-yes">Yes</button>
                        <button onClick={() => handleCancel()} className="surrender-btn surrender-no">No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SurrenderModal