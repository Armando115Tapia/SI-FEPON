import { IEtiqueta } from './etiqueta.interface';

export class Etiqueta implements IEtiqueta {
  private _id: string;
  private _nombre: string;
  private _categoria: string;

  constructor(etiqueta: IEtiqueta) {
    this.id = etiqueta.id;
    this.nombre = etiqueta.nombre;
    this.categoria = etiqueta.categoria;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Getter nombre
   * @return {string}
   */
  public get nombre(): string {
    return this._nombre;
  }

  /**
   * Getter categoria
   * @return {string}
   */
  public get categoria(): string {
    return this._categoria;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * Setter nombre
   * @param {string} value
   */
  public set nombre(value: string) {
    this._nombre = value;
  }

  /**
   * Setter categoria
   * @param {string} value
   */
  public set categoria(value: string) {
    this._categoria = value;
  }
}
