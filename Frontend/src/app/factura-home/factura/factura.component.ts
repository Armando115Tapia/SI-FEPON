import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/primeng';
import { FacturaService } from './servicios/factura.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
  providers: [FacturaService]
})

export class FacturaComponent implements OnInit {

  public formularioDetalleFactura: FormGroup;

  opcionesTipoFactura: IselectButton[];
  detalleFactura: IitemFactura[];
  fecha: Date;
  tipoFactura: string;
  etiquetas: string[];
  totalFactura: number;
  isActualizandoItemDetalleFactura: boolean;
  descripcion: string;
  imagenFactura: File;
  imagenFacturaUrl: any;

  regexNumero: RegExp;
  regexFlotante: RegExp;

  es: Object; // idioma del calendario

  constructor(
    private formBuilder: FormBuilder,
    private facturaService: FacturaService
  ) {
    this.regexNumero = /^\d+$/;
    this.regexFlotante = /^[0-9]+(\.[0-9][0-9]?)?$/;

    this.isActualizandoItemDetalleFactura = false;
    this.opcionesTipoFactura = [
      {label: 'Ingresos', value: 'ingresos'},
      {label: 'Egresos', value: 'egresos'}
    ];
    this.fecha = null;
    this.tipoFactura = null;
    this.etiquetas = [];
    this.detalleFactura = [];

    this.formularioDetalleFactura = this.formBuilder.group({
      'cantidad': [null, [Validators.required, Validators.pattern(this.regexNumero)]],
      'descripcion': [null, Validators.required],
      'precioUnitario': [null, [Validators.required, Validators.pattern(this.regexFlotante)]]
    });

    this.descripcion = '';
    this.imagenFactura = null;
    this.totalFactura = this.calcularTotalFactura();

    this.es = {
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo',
                   'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Borrar'
    };
   }

  ngOnInit() {
  }

  /**
   * Calcula el total de la factura utilizando los datos
   * del detalle de la factura
   *
   * @returns {number} total de valor de factura
   * @memberof FacturaComponent
   */
  calcularTotalFactura(): number {

    let totalFactura = 0;

    for (let indice = 0; indice < this.detalleFactura.length; indice++) {
      const itemFactura = this.detalleFactura[indice];
      totalFactura = totalFactura + (itemFactura.cantidad * itemFactura.precioUnitario);
    }

    return totalFactura;
  }

  /**
   * Agregar un nuevo item a detalle factura
   *
   * @param {IitemFactura} itemFactura contiene los datos de un item
   * @memberof FacturaComponent
   */
  agregarItemADetalleFactura(itemFactura: IitemFactura): void {
    this.detalleFactura.push(Object.assign({}, itemFactura)); // clona el objeto sin referencia
    this.totalFactura = this.calcularTotalFactura();
  }

  /**
   * Elimina un item del detalle factura
   *
   * @param {number} indiceItem indice del item de factura
   * @memberof FacturaComponent
   */
  eliminarItemDetalleFactura(indiceItem: number): void {
    this.detalleFactura.splice(indiceItem, 1);
    this.totalFactura = this.calcularTotalFactura();
  }

  /**
   * Actualiza la factura luego de ser editado
   *
   * @param {IclickToEditEvento} evento contiene el campo y el valor nuevo
   * @param {number} indice contiene el indice del item del detalle factura
   * @memberof FacturaComponent
   */
  actualizarValorTotalFactura(evento: IclickToEditEvento, indice: number) {
    this.detalleFactura[indice][evento.field] = evento.value;
    this.totalFactura = this.calcularTotalFactura();
  }

  /**
   * Actualiza la descripcion luego de ser editado
   *
   * @param {IclickToEditEvento} evento contiene el campo y el valor nuevo
   * @memberof FacturaComponent
   */
  actualizarDescripcion(evento: IclickToEditEvento) {
    this.descripcion = evento.value;
  }

  /**
   * Guarda la imagen en una variable dentro de la clase
   *
   * @param {IuploadHandlerEvento} evento contiene los archivos
   * @param {FileUpload} form contiene los metodos de limpieza del contenedor de imagen
   * @memberof FacturaComponent
   */
  guardarImagenEnFrontEnd(evento: IuploadHandlerEvento, form: FileUpload) {
    this.imagenFactura = evento.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenFactura); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.imagenFacturaUrl = (<FileReader>event.target).result;
    };

    form.clear();
  }

  /**
   * Comprueba si es valido el formulario de factura
   *
   * @returns {boolean} retorna verdadero si es valido sino retorna falso
   * @memberof FacturaComponent
   */
  isFacturaInvalida(): boolean {
    if (this.imagenFactura === null || this.etiquetas.length <= 0
      || this.detalleFactura.length <= 0
      || this.descripcion === null || this.fecha === null
      || this.tipoFactura === null) {
          return true;
    } else {
      return false;
    }
  }

  guardarFactura(): void {

    const modeloFactura = {
      'descripcion': this.descripcion,
      'fecha': this.fecha,
      'total': this.totalFactura,
      'tipo': this.tipoFactura,
      'detalleFacturas': this.detalleFactura,
      'etiquetas': this.etiquetas
    };

    // Guarda la factura en la base de datos
    this.facturaService.guardarFactura(modeloFactura)
      .pipe(map(res => res.json()))
      .subscribe(
        (data: any) => {
          const facturaCreada = data.respuesta;

          // Guarda la imagen asociada a la factura
          this.facturaService.guardarImagen(this.imagenFactura, facturaCreada.id)
            .then(
              (dataImagen: any) => {
                console.log(dataImagen);
                const reader = new FileReader();
                reader.onload = e => {
                  console.log((<FileReader> e.target).result());
                };
                reader.readAsDataURL(this.imagenFactura);
              }
            )
            .catch(
              error => {
                console.log(error);
              }
            );
        },
        error => {
          console.log(error);
        }
      );
  }

}

interface IselectButton {
  label: string;
  value: string;
}

interface IitemFactura {
  cantidad: number;
  descripcion: string;
  precioUnitario: number;
}

interface IclickToEditEvento {
  field: string;
  value: string;
}

interface IuploadHandlerEvento {
  files: Array<File>;
}