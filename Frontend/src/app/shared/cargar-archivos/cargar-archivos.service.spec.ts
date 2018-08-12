import { TestBed, inject } from '@angular/core/testing';

import { CargarArchivosService } from '@app/shared/cargar-archivos/cargar-archivos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CargarArchivosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CargarArchivosService]
    });
  });

  it('should be created', inject([CargarArchivosService], (service: CargarArchivosService) => {
    expect(service).toBeTruthy();
  }));
});
