import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { AuthenticationService } from '@app/core/authentication/authentication.service';
// import { environment } from '@app/environments/environment';

@Injectable()
export class FacturaHomeService {

  private authHeader: Headers;
  private options: RequestOptions;

  // TODO: Agregar token de autenticacion
  constructor(private http: Http) {
    this.authHeader =  new Headers({
      'Content-Type': 'application/json'
      // 'Authorization': 'Bearer ' + autenticacionServicio.credentials.token
    });

    this.options = new RequestOptions({headers: this.authHeader});
  }

  descargarUltimasFacturas(): Observable<Response> {
    return this.http.get('Factura?limit=4', this.options);
  }

}
