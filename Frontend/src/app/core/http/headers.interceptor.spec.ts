import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';
import { HeadersInterceptor } from './headers.interceptor';
import { AuthenticationService } from '@app/core/authentication/authentication.service';

describe('HeaderInterceptor', () => {
  let headersInterceptor: HeadersInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  const authorization = new AuthenticationService();

  function createInterceptor() {
    headersInterceptor = new HeadersInterceptor(authorization);
    return headersInterceptor;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: createInterceptor,
          multi: true
        }
      ]
    });
  });

  beforeEach(inject([HttpClient, HttpTestingController], (_http: HttpClient, _httpMock: HttpTestingController) => {
    http = _http;
    httpMock = _httpMock;
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('deberia tener la cabecera Authorization', () => {
    // Act
    http.get('/toto').subscribe();

    // Assert
    const req = httpMock.expectOne({ url: '/toto' });
    expect(req.request.headers.has('Authorization')).toBe(true);
  });
});
