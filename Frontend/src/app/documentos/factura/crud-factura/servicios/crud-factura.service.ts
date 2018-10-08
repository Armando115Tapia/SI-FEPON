import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRest } from '@app/shared/servicios/base-rest';

@Injectable({
  providedIn: 'root'
})
export class FacturaService extends BaseRest {

  constructor(http: HttpClient) {
    super(http, 'factura');
  }

}

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService extends BaseRest {

  constructor(http: HttpClient) {
    super(http, 'etiqueta');
  }
}
