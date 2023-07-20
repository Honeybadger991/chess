
interface Props{
    number: number;
    img: string | undefined;
    highlight: boolean;
}

const Cell = ({number, img, highlight}: Props) => {
    
    const className: string = ['cell', 
    number % 2 === 0 && 'cell-black', 
    number % 2 !== 0 && 'cell-white', 
    highlight && 'cell-highlight'].filter(Boolean).join(' ');

    return (
        <div className={className}>
            {img && <div className="chess-piece" style={{backgroundImage: `url(${img})`}}></div>}
        </div>
    )
}

export default Cell;