import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFacturaComponent } from './crud-factura.component';
import { SharedModule } from '@app/shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  NgbModule,
  NgbCalendar,
  NgbDatepickerI18n,
  NgbInputDatepicker,
  NgbDateParserFormatter,
  NgbDateAdapter
} from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { FacturaService, EtiquetaService } from './servicios/crud-factura.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpService,
  ApiPrefixInterceptor,
  ErrorHandlerInterceptor,
  AuthenticationService,
  HttpCacheService,
  CacheInterceptor
} from '@app/core';
import { HeadersInterceptor } from '@app/core/http/headers.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CrudFacturaComponent', () => {
  let component: CrudFacturaComponent;
  let fixture: ComponentFixture<CrudFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, SharedModule, HttpClientTestingModule, TagInputModule, BrowserAnimationsModule],
      providers: [
        NgbCalendar,
        NgbInputDatepicker,
        NgbDatepickerI18n,
        NgbDateParserFormatter,
        NgbDateAdapter,
        ApiPrefixInterceptor,
        ErrorHandlerInterceptor,
        HeadersInterceptor,
        AuthenticationService,
        HttpCacheService,
        CacheInterceptor,
        FacturaService,
        EtiquetaService,
        {
          provide: HttpClient,
          useClass: HttpService
        }
      ],
      declarations: [CrudFacturaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
