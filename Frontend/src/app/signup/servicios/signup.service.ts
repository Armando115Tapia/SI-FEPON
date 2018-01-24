import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SignupService {

  constructor(
    private http: Http
  ) { }

  descargarCarrerasDeUsuario(): Observable<Response> {
    return this.http.get('api/v1/carreras');
  }

  crearUsuario(usuario: Object): Observable<Response> {
    return this.http.post('api/v1/usuario/crear', usuario);
  }
}
