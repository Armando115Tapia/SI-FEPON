import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class BuscarFacturaService {
  private authHeader: Headers;
  private options: RequestOptions;

  constructor(private http: Http, private autenticacionServicio: AuthenticationService) {
    this.authHeader =  new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + autenticacionServicio.credentials.token
    });

    this.options = new RequestOptions({headers: this.authHeader});
  }

  buscarFactura(query: string): Observable<Response> {
    return this.http.get('Factura?' + query);
  }
}
