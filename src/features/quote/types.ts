export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

export interface IModal {
  noticia: INoticiasNormalizadas | null;
  visible: boolean;
}

export interface ICita {
  personaje: string;
  cita: string;
  imagen: string;
  direccionPersonaje: string;
}