import { TarjetaModal, ContenedorModal } from "../styles";
import { INoticiasNormalizadas, IModal } from "../types";
import { Dispatch, SetStateAction } from "react";
import PremiumModal from "./PremiumModal";
import GratisModal from "./GratisModal";
import CerrarModButton from "./buttons/CerrarModButton";

interface IProps {
    noticia: INoticiasNormalizadas | null;
    setModal: Dispatch<SetStateAction<IModal>>;
}

const NoticiaModal = ({ noticia, setModal }: IProps) => {
    return (
        <>
            {noticia && (
                <ContenedorModal>
                    <TarjetaModal>
                        <CerrarModButton setModal={setModal} />
                        {noticia.esPremium ? (
                            <PremiumModal setModal={setModal} />
                        ) : (
                            <GratisModal noticia={noticia} />
                        )}
                    </TarjetaModal>
                </ContenedorModal>
            )}
        </>
    );
};

export default NoticiaModal;