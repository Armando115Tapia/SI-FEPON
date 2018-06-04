import { TestBed, inject } from '@angular/core/testing';

import { BuscarFacturaService } from './buscar-factura.service';

describe('BuscarFacturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuscarFacturaService]
    });
  });

  it('should be created', inject([BuscarFacturaService], (service: BuscarFacturaService) => {
    expect(service).toBeTruthy();
  }));
});
