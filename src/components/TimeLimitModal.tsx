
interface TimeLimitModalProp{
    timeLimit: number | null;
    setTimeLimit: Function;
}
const TimeLimitModal = ({timeLimit, setTimeLimit}: TimeLimitModalProp) => {
  return (
    <div className={timeLimit === null ? 'modal active' : 'modal'}>
        <div className={timeLimit === null  ? 'modal-content active' : 'modal-content'}>
            <div className="time-limit-wrapper">
                <h2 className="time-limit-text">Pick the game's time limit</h2>
                <div className="time-limit-btns">
                    <button onClick={() => setTimeLimit(Infinity)} className="time-limit-btn">No limit</button>
                    <button onClick={() => setTimeLimit(60)} className="time-limit-btn">1 minute</button>
                    <button onClick={() => setTimeLimit(180)} className="time-limit-btn">3 minutes</button>
                    <button onClick={() => setTimeLimit(600)} className="time-limit-btn">10 minutes</button>
                    <button onClick={() => setTimeLimit(1800)} className="time-limit-btn">30 minutes</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimeLimitModal