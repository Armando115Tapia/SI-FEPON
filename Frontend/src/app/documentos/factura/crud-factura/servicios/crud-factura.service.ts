import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudFacturaService {
  constructor(private http: HttpClient) {}

  descargarEtiqueta(): Observable<Object> {
    return this.http.cache().get('Etiqueta');
  }
}
