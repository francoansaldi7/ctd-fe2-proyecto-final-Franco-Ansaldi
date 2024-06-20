import { Dispatch, SetStateAction } from "react";
import { IModal, INoticiasNormalizadas } from "../types";
import {
  TarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  BotonLectura,
} from "../styles";

interface IProps {
  noticia: INoticiasNormalizadas;
  setModal: Dispatch<SetStateAction<IModal>>;
}

const CardNoticia = ({ noticia, setModal }: IProps) => {
  return (
    <TarjetaNoticia>
      <ImagenTarjetaNoticia src={noticia.imagen} />
      <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
      <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
      <DescripcionTarjetaNoticia>
        {noticia.descripcionCorta}
      </DescripcionTarjetaNoticia>
      <BotonLectura
        onClick={() => {
          setModal({ noticia: noticia, visible: true });
        }}
      >
        Ver más
      </BotonLectura>
    </TarjetaNoticia>
  );
};

export default CardNoticia;