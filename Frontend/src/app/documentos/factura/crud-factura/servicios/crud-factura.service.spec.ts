import { TestBed, inject } from '@angular/core/testing';

import { CrudFacturaService } from './crud-factura.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CrudFacturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrudFacturaService]
    });
  });

  it('should be created', inject([CrudFacturaService], (service: CrudFacturaService) => {
    expect(service).toBeTruthy();
  }));
});
