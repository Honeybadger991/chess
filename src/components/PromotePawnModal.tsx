import { PieceType } from "../Types";

interface promotePawnModalProp{
    modal: boolean;
    setModal: Function;
    promotePawn: Function;
    promotionTeamType: Function;
}
const PromotePawnModal = ({modal, setModal, promotePawn, promotionTeamType}: promotePawnModalProp) => {

    const handlePromotePick = (pieceType: PieceType, value: number) => {
        promotePawn(pieceType, value);
        setModal(false);
    }

    return (
        <div className={modal ? 'modal active' : 'modal'}>
            <div className={modal ? 'modal-content active' : 'modal-content'}>
                <div className="promote-piece">
                    <img onClick={() => handlePromotePick(PieceType.BISHOP, 3.1)} src={`assets/bishop-${promotionTeamType()}.png`} alt="bishop" />
                    <img onClick={() => handlePromotePick(PieceType.QUEEN, 9)} src={`assets/queen-${promotionTeamType()}.png`} alt="queen" />
                    <img onClick={() => handlePromotePick(PieceType.ROOK, 5)} src={`assets/rook-${promotionTeamType()}.png`} alt="rook" />
                    <img onClick={() => handlePromotePick(PieceType.KNIGHT, 3)} src={`assets/knight-${promotionTeamType()}.png`} alt="knight" />
                </div>
            </div>
        </div>
    )
}

export default PromotePawnModal;