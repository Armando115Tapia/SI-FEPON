import { TestBed, inject } from '@angular/core/testing';

import { CargarArchivosService } from '@app/shared/cargar-archivos/cargar-archivos.service';

describe('CargarArchivosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargarArchivosService]
    });
  });

  it('should be created', inject([CargarArchivosService], (service: CargarArchivosService) => {
    expect(service).toBeTruthy();
  }));
});
