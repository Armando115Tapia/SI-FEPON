import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';
import { Subject, Observable, of, Subscription } from 'rxjs';
import { environment } from '@env/environment';
import { finalize } from 'rxjs/operators';

@Injectable()
export class CargarArchivosService {

  private peticionesImagen: Subscription[];
  constructor(private http: HttpClient) {
    this.peticionesImagen = [];
  }

  public upload(files: File[]): { [key: string]: Observable<number> } {
    // this will be the our resulting map
    const status = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('imagen', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', 'api/v1/imagen/factura', formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();
      const imagen = new Subject<Object>();

      // send the http-request and subscribe for progress-updates
      const auxPeticion = this.http.request(req).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            // calculate the progress percentage
            const percentDone = Math.round((100 * event.loaded) / event.total);

            // pass the percentage into the progress-stream
            progress.next(percentDone);
          } else if (event instanceof HttpResponse) {
            // Close the progress-stream if we get an answer form the API
            // The upload is complete
            imagen.next(event.body['imagen']);
            imagen.complete();
            progress.complete();
          }
        },
        error => console.log(error)
      );

      this.peticionesImagen.push(auxPeticion);

      // Save every progress-observable in a map of all observables
      console.log('evento', imagen);
      status[file.name] = {
        progress: progress.asObservable(),
        imagen: imagen.asObservable()
      };
    });

    // return the map of progress.observables
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
}
