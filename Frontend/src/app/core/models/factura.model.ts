import { IDetalleFactura } from './detalle-factura.model';
import { IImagenFactura } from './imagen-factura';
import { Etiqueta } from './etiqueta.model';
import { IDetalleTotal } from './detalle-total.model';
import { IFactura, IFacturaDatabase } from './factura.interface';

export class Factura implements IFactura {
  private _id: string;
  private _nombreEmisor: string;
  private _rucEmisor: string;
  private _numeroFactura: string;
  private _fecha: {'year': number, 'month': number, 'day': number};
  private _nombreReceptor: string;
  private _rucReceptor: string;
  private _detalle: IDetalleFactura[];
  private _subTotalDetalle: number;
  private _detalleTotal: IDetalleTotal[];
  private _subTotalDetalleTotal: number;
  private _comentario: string;
  private _total: number;
  private _isIngreso: boolean;
  private _etiquetas: Etiqueta[];
  private _imagenes: IImagenFactura[];
  private _isIva: boolean;
  private _iva: number;
  private _valorIva: number;

  constructor(factura: IFactura) {
    this.id = factura.id;
    this.nombreEmisor = factura.nombreEmisor;
    this.rucEmisor = factura.rucEmisor;
    this.numeroFactura = factura.numeroFactura;
    this.fecha = factura.fecha;
    this.nombreReceptor = factura.nombreReceptor;
    this.rucReceptor = factura.rucReceptor;
    this.detalle = factura.detalle;
    this.subTotalDetalle = factura.subTotalDetalle;
    this.detalleTotal = factura.detalleTotal;
    this.subTotalDetalleTotal = factura.subTotalDetalleTotal;
    this.comentario = factura.comentario;
    this.total = factura.total;
    this.isIngreso = factura.isIngreso;
    this.etiquetas = factura.etiquetas ? factura.etiquetas.map(etiqueta => new Etiqueta(etiqueta)) : [];
    this.imagenes = factura.imagenes;
    this.isIva = factura.isIva;
    this.iva = factura.iva;
    this.valorIva = factura.valorIva;

    this.calculoTotal();
  }

  /**
   * Getter valorIva
   * @return {number}
   */
  public get valorIva(): number {
    return this._valorIva;
  }

  /**
   * Calcula el total de un rubro del detalle
   *
   * @param {IDetalleFactura} detalle
   * @memberof Factura
   */
  calcularSubTotalRubro(detalle: IDetalleFactura) {
    detalle.total = detalle.cantidad * detalle.precioUnitario;
  }

  /**
   * Calcula el subtotal de la factura a través del
   * el detalle de la factura
   *
   * @memberof Factura
   */
  calcularSubTotalDetalle() {
    let subTotal = 0;
    for (const detalle of this.detalle) {
      this.calcularSubTotalRubro(detalle);
      subTotal += detalle.total;
    }
    this.subTotalDetalle = subTotal;
  }

  calcularSubTotalDetalleTotal() {
    let subTotal = 0;
    for (const detalleTotal of this.detalleTotal) {
      subTotal += detalleTotal.cantidad;
    }
    this.subTotalDetalleTotal = subTotal;
  }

  calculoTotal() {
    let total = 0;
    this.calcularSubTotalDetalle();
    this.calcularSubTotalDetalleTotal();
    if (this.isIva) {
      this.valorIva = (this.subTotalDetalle * this.iva) / 100;
      total = this.valorIva + this.subTotalDetalleTotal + this.subTotalDetalle;
    } else {
      this.valorIva = 0;
      total = this.subTotalDetalle + this.subTotalDetalleTotal;
    }
    this.total = total;
  }

  public get toDatabase(): IFacturaDatabase {
    return {
      id: this.id,
      nombreEmisor: this.nombreEmisor,
      rucEmisor: this.rucEmisor,
      numeroFactura: this.numeroFactura,
      fecha: new Date(this.fecha.year, this.fecha.month, this.fecha.day),
      nombreReceptor: this.nombreReceptor,
      rucReceptor: this.rucReceptor,
      detalle: this.detalle,
      subTotalDetalle: this.subTotalDetalle,
      detalleTotal: this.detalleTotal,
      subTotalDetalleTotal: this.subTotalDetalleTotal,
      comentario: this.comentario,
      total: this.total,
      isIngreso: this.isIngreso,
      etiquetas: this.etiquetas.map(etiqueta => etiqueta.id),
      imagenes: this.imagenes,
      isIva: this.isIva,
      valorIva: this.valorIva,
      iva: this.iva
    };
  }

  /**
   * Getter subTotalDetalle
   * @return {number}
   */
  public get subTotalDetalle(): number {
    return this._subTotalDetalle;
  }

  /**
   * Getter subTotalDetalleTotal
   * @return {number}
   */
  public get subTotalDetalleTotal(): number {
    return this._subTotalDetalleTotal;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Getter nombreEmisor
   * @return {string}
   */
  public get nombreEmisor(): string {
    return this._nombreEmisor;
  }

  /**
   * Getter rucEmisor
   * @return {string}
   */
  public get rucEmisor(): string {
    return this._rucEmisor;
  }

  /**
   * Getter numeroFactura
   * @return {string}
   */
  public get numeroFactura(): string {
    return this._numeroFactura;
  }

  /**
   * Getter fecha
   * @return {'year': number, 'month': number, 'day': number}
   */
  public get fecha(): {'year': number, 'month': number, 'day': number} {
    return this._fecha;
  }

  /**
   * Getter nombreReceptor
   * @return {string}
   */
  public get nombreReceptor(): string {
    return this._nombreReceptor;
  }

  /**
   * Getter rucReceptor
   * @return {string}
   */
  public get rucReceptor(): string {
    return this._rucReceptor;
  }

  /**
   * Getter detalle
   * @return {IDetalleFactura[]}
   */
  public get detalle(): IDetalleFactura[] {
    return this._detalle;
  }

  /**
   * Getter detalleTotal
   * @return {IDetalleTotal[]}
   */
  public get detalleTotal(): IDetalleTotal[] {
    return this._detalleTotal;
  }

  /**
   * Getter comentario
   * @return {string}
   */
  public get comentario(): string {
    return this._comentario;
  }

  /**
   * Getter total
   * @return {number}
   */
  public get total(): number {
    return this._total;
  }

  /**
   * Getter isIngreso
   * @return {boolean}
   */
  public get isIngreso(): boolean {
    return this._isIngreso;
  }

  /**
   * Getter etiquetas
   * @return {Etiqueta[]}
   */
  public get etiquetas(): Etiqueta[] {
    return this._etiquetas;
  }

  /**
   * Getter imagen
   * @return {IImagenFactura[]}
   */
  public get imagenes(): IImagenFactura[] {
    return this._imagenes;
  }

  /**
   * Getter isIva
   * @return {boolean}
   */
  public get isIva(): boolean {
    return this._isIva;
  }

  /**
   * Getter iva
   * @return {number}
   */
  public get iva(): number {
    return this._iva;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * Setter nombreEmisor
   * @param {string} value
   */
  public set nombreEmisor(value: string) {
    this._nombreEmisor = value;
  }

  /**
   * Setter rucEmisor
   * @param {string} value
   */
  public set rucEmisor(value: string) {
    this._rucEmisor = value;
  }

  /**
   * Setter numeroFactura
   * @param {string} value
   */
  public set numeroFactura(value: string) {
    this._numeroFactura = value;
  }

  /**
   * Setter fecha
   * @param {'year': number, 'month': number, 'day': number} value
   */
  public set fecha(value: {'year': number, 'month': number, 'day': number}) {
    this._fecha = value;
  }

  /**
   * Setter nombreReceptor
   * @param {string} value
   */
  public set nombreReceptor(value: string) {
    this._nombreReceptor = value;
  }

  /**
   * Setter rucReceptor
   * @param {string} value
   */
  public set rucReceptor(value: string) {
    this._rucReceptor = value;
  }

  /**
   * Setter detalle
   * @param {IDetalleFactura[]} value
   */
  public set detalle(value: IDetalleFactura[]) {
    this._detalle = value;
  }

  /**
   * Setter detalleTotal
   * @param {IDetalleTotal[]} value
   */
  public set detalleTotal(value: IDetalleTotal[]) {
    this._detalleTotal = value;
  }

  /**
   * Setter comentario
   * @param {string} value
   */
  public set comentario(value: string) {
    this._comentario = value;
  }

  /**
   * Setter total
   * @param {number} value
   */
  public set total(value: number) {
    this._total = value;
  }

  /**
   * Setter isIngreso
   * @param {boolean} value
   */
  public set isIngreso(value: boolean) {
    this._isIngreso = value;
  }

  /**
   * Setter etiquetas
   * @param {Etiqueta[]} value
   */
  public set etiquetas(value: Etiqueta[]) {
    this._etiquetas = value;
  }

  /**
   * Setter imagen
   * @param {IImagenFactura[]} value
   */
  public set imagenes(value: IImagenFactura[]) {
    this._imagenes = value;
  }

  /**
   * Setter isIva
   * @param {boolean} value
   */
  public set isIva(value: boolean) {
    this._isIva = value;
  }

  /**
   * Setter iva
   * @param {number} value
   */
  public set iva(value: number) {
    this._iva = value;
  }

  /**
   * Setter subTotalDetalle
   * @param {number} value
   */
  public set subTotalDetalle(value: number) {
    this._subTotalDetalle = value;
  }

  /**
   * Setter subTotalDetalleTotal
   * @param {number} value
   */
  public set subTotalDetalleTotal(value: number) {
    this._subTotalDetalleTotal = value;
  }

  /**
   * Setter valorIva
   * @param {number} value
   */
  public set valorIva(value: number) {
    this._valorIva = value;
  }
}
