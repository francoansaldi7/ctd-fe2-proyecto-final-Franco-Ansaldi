import { Dispatch, SetStateAction } from "react";
import { CloseButton as Close } from "../../../../assets";
import { IModal } from "../../types";
import { CloseButton } from "../../styles";

interface IProps {
    setModal: Dispatch<SetStateAction<IModal>>;
}

const CerrarModButton = ({ setModal }: IProps) => {
    return (
        <CloseButton onClick={() => setModal({ noticia: null, visible: false })}>
            <img src={Close} alt="close-button" />
        </CloseButton>
    );
};

export default CerrarModButton;