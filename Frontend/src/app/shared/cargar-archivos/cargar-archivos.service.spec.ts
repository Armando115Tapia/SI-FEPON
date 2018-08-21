import { TestBed, inject } from '@angular/core/testing';

import { CargarArchivosService } from '@app/shared/cargar-archivos/cargar-archivos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, Subject, Observable } from 'rxjs';
import { IImagenFactura } from '@app/core/models';

describe('CargarArchivosService', () => {
  let servicio: CargarArchivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CargarArchivosService]
    });

    servicio = new CargarArchivosService(null);
  });

  it('should be created', inject([CargarArchivosService], (service: CargarArchivosService) => {
    expect(service).toBeTruthy();
  }));

  it('deberia retornar los objetos de progreso de subir archivo', inject(
    [CargarArchivosService, HttpTestingController],
    (service: CargarArchivosService, backend: HttpTestingController) => {
      const file = new File(['nombre'], 'archivo-prueba.jpg', { lastModified: 1534721459534, type: 'image/jpeg' });
      const progress = service.upload([file]);

      expect(progress).toEqual({
        'archivo-prueba.jpg': {
          progress: new Subject<number>().asObservable(),
          imagen: new Subject<IImagenFactura>().asObservable()
        }
      });
    }
  ));

  it('deberia limpiar todas las peticiones de imagenes por subir', () => {
    servicio.cancelarPeticiones();
    expect(servicio.peticionesImagen.length).toBe(0);
  });

  it('deberia limpiar todas las peticiones de imagenes', () => {
    servicio.reiniciarArregloPeticionesImagen();
    expect(servicio.peticionesImagen.length).toBe(0);
  });
});
