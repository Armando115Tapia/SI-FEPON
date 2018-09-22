import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';
import { Subject, Observable, Subscription } from 'rxjs';
import { IImagenFactura } from '@app/core/models';
import { TipoImagen } from '@app/shared/utilidades.util';

@Injectable()
export class CargarArchivosService {
  private _peticionesImagen: Subscription[];
  private peticionesImagenes: Map<string, Subscription>;
  constructor(private http: HttpClient) {
    this.peticionesImagen = [];
    this.peticionesImagenes = new Map();
  }

  public upload(files: File[]): { [key: string]: { imagen: Observable<IImagenFactura> } } {
    const status = {};

    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('imagen', file, file.name);

      const req = new HttpRequest('POST', 'api/v1/imagen/factura', formData);
      const imagen = new Subject<Object>();

      const auxPeticion = this.http.request(req).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            imagen.next(event.body['imagen']);
            imagen.complete();
          }
        },
        error => console.log(error)
      );

      this.peticionesImagenes.set(file.name, auxPeticion);

      status[file.name] = {
        imagen: imagen.asObservable()
      };
    });
    return status;
  }

  public cancelarPeticiones(): void {
    for (const nombreArchivo of Array.from(this.peticionesImagenes.keys())) {
      const peticion = this.peticionesImagenes.get(nombreArchivo);
      peticion.unsubscribe();
    }
    this.peticionesImagenes.clear();
  }

  public reiniciarArregloPeticionesImagen(): void {
    this.peticionesImagen = [];
  }

  public cancelaPeticion(nombreArchivo: string) {
    const peticion = this.peticionesImagenes.get(nombreArchivo);
    peticion.unsubscribe();
  }

  public eliminarArchivo(tipo: TipoImagen, nombre: string): Observable<Object> {
    return this.http.delete('api/v1/imagen?nombre=' + nombre + '&&tipo=' + tipo);
  }

  /**
   * Getter peticionesImagen
   * Contiene todas las peticiones de imagenes en estado subiendo
   * @return {Subscription[]}
   */
  public get peticionesImagen(): Subscription[] {
    return this._peticionesImagen;
  }

  /**
   * Setter peticionesImagen
   * @param {Subscription[]} value
   */
  public set peticionesImagen(value: Subscription[]) {
    this._peticionesImagen = value;
  }
}
