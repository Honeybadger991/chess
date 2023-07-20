import { PieceType, Piece, samePosition } from "../Constants";

interface ModalProp{
    modal: boolean;
    setModal: Function;
    promotionPawn: Piece;
    pieces: Piece[];
    setPieces: Function;
}
const Modal = ({modal, setModal, promotionPawn, pieces, setPieces}: ModalProp) => {

    const color = promotionPawn?.team === 1 ? 'w' : 'b';

    const promotePawn = (pieceType: PieceType) => {

        const updatedPieces = pieces.reduce((results, p) => {
            if(samePosition(p.position, promotionPawn.position)){
                p.type = pieceType;

                let img: string = '';
                switch(pieceType){
                    case PieceType.ROOK:
                        img = `assets/rook-${color}.png`;
                        break;
                    case PieceType.KNIGHT:
                        img = `assets/knight-${color}.png`;
                        break;
                    case PieceType.QUEEN:
                        img = `assets/queen-${color}.png`;
                        break;
                    case PieceType.BISHOP:
                        img = `assets/bishop-${color}.png`;
                        break;
                };
                p.img = img;
            }
            results.push(p);
            return results;
        }, [] as Piece[]);
        setPieces(updatedPieces)
    }

    const handlePromotePick = (pieceType: PieceType) => {
        promotePawn(pieceType)
        setModal(false)
    }

    

    return (
        <div className={modal ? 'modal active' : 'modal'}>
            <div className={modal ? 'modal-content active' : 'modal-content'}>
                <div className="promote-piece">
                    <img onClick={() => handlePromotePick(PieceType.BISHOP)} src={`assets/bishop-${color}.png`} alt="" />
                    <img onClick={() => handlePromotePick(PieceType.QUEEN)} src={`assets/queen-${color}.png`} alt="" />
                    <img onClick={() => handlePromotePick(PieceType.ROOK)} src={`assets/rook-${color}.png`} alt="" />
                    <img onClick={() => handlePromotePick(PieceType.KNIGHT)} src={`assets/knight-${color}.png`} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Modal