import { TestBed, inject } from '@angular/core/testing';

import { CrudFacturaService } from './crud-factura.service';

describe('CrudFacturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudFacturaService]
    });
  });

  it('should be created', inject([CrudFacturaService], (service: CrudFacturaService) => {
    expect(service).toBeTruthy();
  }));
});
