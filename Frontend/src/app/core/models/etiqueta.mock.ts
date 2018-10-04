import { IEtiqueta } from './etiqueta.interface';

const getDefaults = (): IEtiqueta =>
  <IEtiqueta>{
    id: '',
    nombre: '',
    categoria: ''
  };

const getIEtiquetaMock = (p?: Partial<IEtiqueta>): IEtiqueta => {
  return <IEtiqueta>{
    ...getDefaults(),
    ...p
  };
};

export { getIEtiquetaMock };
