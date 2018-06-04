import { TestBed, inject } from '@angular/core/testing';

import { FacturaHomeService } from './factura-home.service';

describe('FacturaHomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacturaHomeService]
    });
  });

  it('should be created', inject([FacturaHomeService], (service: FacturaHomeService) => {
    expect(service).toBeTruthy();
  }));
});
