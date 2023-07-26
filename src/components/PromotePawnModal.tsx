import { PieceType } from "../Types";

interface promotePawnModalProp{
    modal: boolean;
    setModal: Function;
    promotePawn: Function;
    promotionTeamType: Function;
}
const PromotePawnModal = ({modal, setModal, promotePawn, promotionTeamType}: promotePawnModalProp) => {

    const handlePromotePick = (pieceType: PieceType) => {
        promotePawn(pieceType)
        setModal(false)
    }

    return (
        <div className={modal ? 'modal active' : 'modal'}>
            <div className={modal ? 'modal-content active' : 'modal-content'}>
                <div className="promote-piece">
                    <img onClick={() => handlePromotePick(PieceType.BISHOP)} src={`assets/bishop-${promotionTeamType()}.png`} alt="" />
                    <img onClick={() => handlePromotePick(PieceType.QUEEN)} src={`assets/queen-${promotionTeamType()}.png`} alt="" />
                    <img onClick={() => handlePromotePick(PieceType.ROOK)} src={`assets/rook-${promotionTeamType()}.png`} alt="" />
                    <img onClick={() => handlePromotePick(PieceType.KNIGHT)} src={`assets/knight-${promotionTeamType()}.png`} alt="" />
                </div>
            </div>
        </div>
    )
}

export default PromotePawnModal;