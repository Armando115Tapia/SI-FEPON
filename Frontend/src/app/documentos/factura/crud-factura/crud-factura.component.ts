import { Component, OnInit } from '@angular/core';
import { Factura } from '@app/core/models/factura.model';
import { getIFacturaMock } from '@app/core/models/factura.mock';
import { getIEtiquetaMock } from '@app/core/models/etiqueta.mock';
import { IEtiqueta } from '@app/core/models/etiqueta.interface';
import { FacturaService, EtiquetaService } from '@app/documentos/factura/crud-factura/servicios/crud-factura.service';
import { NgForm } from '@angular/forms';
import { IModeloArchivoCompleto } from '@app/shared/utilidades.util';
import { Logger } from '@app/core';
import { IFacturaDatabase, IFactura } from '@app/core/models/factura.interface';

const log = new Logger('Crud factura');

@Component({
  selector: 'app-crud-factura',
  templateUrl: './crud-factura.component.html',
  styleUrls: ['./crud-factura.component.scss']
})
export class CrudFacturaComponent implements OnInit {
  factura: Factura;
  etiquetas: IEtiqueta[];
  archivosAlmacenados: IModeloArchivoCompleto[];

  constructor(private facturaService: FacturaService, private etiquetaService: EtiquetaService) {
    this.factura = new Factura(getIFacturaMock());
    this.etiquetas = [
      getIEtiquetaMock({ id: '1', nombre: 'poliperros', categoria: 'proyectos' }),
      getIEtiquetaMock({ id: '2', nombre: 'gimnasio', categoria: 'gimnasio' }),
      getIEtiquetaMock({ id: '3', nombre: 'secretaria', categoria: 'empleados' }),
      getIEtiquetaMock({ id: '4', nombre: 'limpieza', categoria: 'empleados' }),
      getIEtiquetaMock({ id: '5', nombre: 'comida', categoria: 'implementos' }),
      getIEtiquetaMock({ id: '6', nombre: 'implementos oficina', categoria: 'implementos' })
    ];
    this.archivosAlmacenados = [];
  }

  ngOnInit() {
    // TODO: Agregar etiquetas al servidor y descargar aquí
    this.etiquetaService.findWhere().subscribe(data => console.log(data));
  }

  agregarRubroASubtotalDetalle() {
    this.factura.detalle.push({ cantidad: 0, descripcion: '', precioUnitario: 0, total: 0 });
  }

  eliminarRubroASubtotalDetalle(indiceRubro: number) {
    this.factura.detalle.splice(indiceRubro, 1);
  }

  agregarRubroASubtotalDetalleTotal() {
    this.factura.detalleTotal.push({ cantidad: 0, nombre: '' });
  }

  eliminarRubroASubtotalDetalleTotal(indiceRubro: number) {
    this.factura.detalleTotal.splice(indiceRubro, 1);
  }

  /**
   * Obtiene todos los archivos almacenados que le pertenece a la factura
   *
   * @param {*} $event
   * @memberof CrudFacturaComponent
   */
  sincronizacionArchivosAlmacenados(event: IModeloArchivoCompleto[]) {
    this.archivosAlmacenados = event;
  }

  guardarFactura(form: NgForm) {
    if (form.invalid) {
      // Activa los mensajes de texto en pantalla
      Object.keys(form.controls).forEach((key: string) => {
        if (form.controls[key].invalid) {
          form.controls[key].markAsTouched();
        }
      });
    } else {
      this.factura.imagenes = this.archivosAlmacenados;
      const modeloFactura = this.factura.toDatabase;
      delete modeloFactura['id'];
      this.facturaService.create(modeloFactura).subscribe((data: IFacturaDatabase) => {
        log.info('factura creada', modeloFactura);
        const factura: any = data;
        factura.fecha = { year: data.fecha.getFullYear(), month: data.fecha.getMonth(), day: data.fecha.getDay() };
        this.factura = new Factura(<IFactura>factura);
      });
    }
  }
}
