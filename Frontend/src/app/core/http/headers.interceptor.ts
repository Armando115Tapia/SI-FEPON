import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@env/environment';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  private token: string;
  constructor(private authorization: AuthenticationService) {

    if (this.authorization.credentials) {
      this.token = this.authorization.credentials.token;
    } else {
      this.token = '';
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return next.handle(request);
  }
}
