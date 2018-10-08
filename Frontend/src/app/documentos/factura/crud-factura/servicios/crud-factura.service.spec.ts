import { TestBed, inject } from '@angular/core/testing';

import { FacturaService, EtiquetaService } from './crud-factura.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CrudFacturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FacturaService, EtiquetaService]
    });
  });

  it('should be created', inject([FacturaService, EtiquetaService], (service: [FacturaService, EtiquetaService]) => {
    expect(service).toBeTruthy();
  }));
});
