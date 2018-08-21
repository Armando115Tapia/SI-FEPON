import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';
import { Subject, Observable, Subscription } from 'rxjs';
import { IImagenFactura } from '@app/core/models';

@Injectable()
export class CargarArchivosService {
  private _peticionesImagen: Subscription[];
  constructor(private http: HttpClient) {
    this.peticionesImagen = [];
  }

  public upload(
    files: File[]
  ): { [key: string]: { progress: Observable<number>; imagen: Observable<IImagenFactura> } } {
    const status = {};

    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('imagen', file, file.name);

      const req = new HttpRequest('POST', 'api/v1/imagen/factura', formData, {
        reportProgress: true
      });

      const progress = new Subject<number>();
      const imagen = new Subject<Object>();

      const auxPeticion = this.http.request(req).subscribe(
        event => {
          // Reporta el progreso de subida
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((100 * event.loaded) / event.total);
            progress.next(percentDone);
          } else if (event instanceof HttpResponse) {
            // Una vez completado al subida
            imagen.next(event.body['imagen']);
            imagen.complete();
            progress.complete();
          }
        },
        error => console.log(error)
      );

      this.peticionesImagen.push(auxPeticion);
      status[file.name] = {
        progress: progress.asObservable(),
        imagen: imagen.asObservable()
      };
    });
    return status;
  }

  public cancelarPeticiones(): void {
    for (let indice = 0; indice < this.peticionesImagen.length; indice++) {
      this.peticionesImagen[indice].unsubscribe();
    }
    this.reiniciarArregloPeticionesImagen();
  }

  public reiniciarArregloPeticionesImagen(): void {
    this.peticionesImagen = [];
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
