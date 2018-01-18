import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  constructor(
    private http: Http
  ) { }

  descargarRolesDeUsuario(): Observable<Response> {
    return this.http.get('api/v1/rol');
  }

  autenticarUsuario(credenciales: Object): Observable<Response> {
    return this.http.post('api/v1/usuario/ingresar', credenciales);
  }

}
