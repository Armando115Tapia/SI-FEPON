import { Component, OnInit } from '@angular/core';
import { Factura } from '@app/core/models/factura.model';
import { getIFacturaMock } from '@app/core/models/factura.mock';
import { getIEtiquetaMock } from '@app/core/models/etiqueta.mock';
import { IEtiqueta } from '@app/core/models/etiqueta.interface';
import { CrudFacturaService } from '@app/documentos/factura/crud-factura/servicios/crud-factura.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crud-factura',
  templateUrl: './crud-factura.component.html',
  styleUrls: ['./crud-factura.component.scss']
})
export class CrudFacturaComponent implements OnInit {
  factura: Factura;
  etiquetas: IEtiqueta[];

  constructor(private crudFacturaService: CrudFacturaService) {
    this.factura = new Factura(getIFacturaMock());
    this.etiquetas = [
      getIEtiquetaMock({ id: '1', nombre: 'poliperros', categoria: 'proyectos' }),
      getIEtiquetaMock({ id: '2', nombre: 'gimnasio', categoria: 'gimnasio' }),
      getIEtiquetaMock({ id: '3', nombre: 'secretaria', categoria: 'empleados' }),
      getIEtiquetaMock({ id: '4', nombre: 'limpieza', categoria: 'empleados' }),
      getIEtiquetaMock({ id: '5', nombre: 'comida', categoria: 'implementos' }),
      getIEtiquetaMock({ id: '6', nombre: 'implementos oficina', categoria: 'implementos' })
    ];
  }

  ngOnInit() {
    // TODO: Agregar etiquetas al servidor y descargar aquí
    this.crudFacturaService.descargarEtiquetas().subscribe(data => console.log(data), error => console.error(error));
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

  guardarFactura(form: NgForm) {
    if (form.invalid) {
      // Activa los mensajes de texto en pantalla
      Object.keys(form.controls).forEach((key: string) => {
        if (form.controls[key].invalid) {
          form.controls[key].markAsTouched();
        }
      });
    } else {
      console.log('Enviado', form.value);
    }
  }
}
