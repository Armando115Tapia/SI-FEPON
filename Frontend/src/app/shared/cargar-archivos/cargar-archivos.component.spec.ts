import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarArchivosComponent } from '@app/shared/cargar-archivos/cargar-archivos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, Subject } from 'rxjs';
import { IImagenFactura } from '@app/core/models';
import { CargarArchivosService } from '@app/shared/cargar-archivos/cargar-archivos.service';
import { SharedModule } from '@app/shared/shared.module';

describe('CargarArchivosComponent', () => {
  let servicio: CargarArchivosService;
  let component: CargarArchivosComponent;
  let fixture: ComponentFixture<CargarArchivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule]
    }).compileComponents();
    servicio = new CargarArchivosService(null);
    component = new CargarArchivosComponent(servicio);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia agregar imagenes seleccionadas a listas de archivos por subir', () => {
    component.agregarImagenesSeleccionadasToArchivosPorSubir();
    expect(component.archivosPorSubir.length).toBe(0);
  });

  // TODO: pasar esta prueba
  xit('deberia cargar el archivo a través del archivos por subir', () => {
    const file = new File(['nombre'], 'archivo-prueba.jpg', { lastModified: 1534721459534, type: 'image/jpeg' });

    const status: { [key: string]: { progress: Observable<number>; imagen: Observable<IImagenFactura> } } = {
      'archivo-prueba.jpg': {
        progress: new Subject<number>().asObservable(),
        imagen: new Subject<IImagenFactura>().asObservable()
      }
    };
    spyOn(servicio, 'upload').and.returnValue(status);

    component.archivosPorSubir = [file];
    component.cargarTodasLasImagenes();
    expect(component.archivosPorSubir.length).toBe(0);
  });

  it('deberia subir archivos seleccionados', () => {
    const file = new File(['nombre'], 'archivo-prueba.jpg', { lastModified: 1534721459534, type: 'image/jpeg' });

    const status: { [key: string]: { progress: Observable<number>; imagen: Observable<IImagenFactura> } } = {
      'archivo-prueba.jpg': {
        progress: new Subject<number>().asObservable(),
        imagen: new Subject<IImagenFactura>().asObservable()
      }
    };
    spyOn(servicio, 'upload').and.returnValue(status);

    expect(servicio.upload([file])).toEqual(status);
  });
});
