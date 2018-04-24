import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FacturaService {

  private authHeader: Headers;
  private options: RequestOptions;

  constructor(private http: Http, private autenticacionServicio: AuthenticationService) {
    this.authHeader =  new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + autenticacionServicio.credentials.token
    });

    this.options = new RequestOptions({headers: this.authHeader});
  }

  guardarFactura(factura: any): Observable<Response> {
    return this.http.post('api/v1/factura/crear', factura, this.options);
  }

  guardarImagen(imagenFactura: File, idFactura: number) {
    const url = environment.serverUrl + 'api/v1/imagen/factura';
    if (typeof imagenFactura !== 'undefined') {
        return new Promise((resolve, reject) => {
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();
            formData.append('imagen', imagenFactura, imagenFactura.name);
            xhr.open('POST', url + '?idFactura=' + idFactura, true); // true: asynchronous request
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.autenticacionServicio.credentials.token);
            xhr.send(formData);
            xhr.onreadystatechange = function () {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                  resolve(JSON.parse(xhr.responseText));
              }
            };
        });
    }
  }
}
