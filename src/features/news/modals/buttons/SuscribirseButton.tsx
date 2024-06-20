import { BotonSuscribir } from "../../styles";
import { Dispatch, SetStateAction } from "react";
import { IModal } from "../../types";

interface IProps {
    setModal: Dispatch<SetStateAction<IModal>>;
}

const SuscribirseButton = ({ setModal }: IProps) => {
    return (
        <BotonSuscribir
            onClick={() =>
                setTimeout(() => {
                    alert("Suscripto!");
                    setModal({ noticia: null, visible: false });
                }, 1000)
            }
        >
            Suscríbete
        </BotonSuscribir>
    );
};

export default SuscribirseButton;