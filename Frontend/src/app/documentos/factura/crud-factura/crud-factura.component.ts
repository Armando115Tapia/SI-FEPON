import { Component, OnInit, EventEmitter } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-crud-factura',
  templateUrl: './crud-factura.component.html',
  styleUrls: ['./crud-factura.component.scss']
})
export class CrudFacturaComponent implements OnInit {

  options: UploaderOptions;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  isCargandoImagen: boolean[];
  isCargadoImagen: boolean[];

  constructor(private http: HttpClient) {
    this.http
      .get('factura')
      .subscribe(data => console.log(data), error => console.log(error));

    this.options = { concurrency: 1, maxUploads: 3 };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.isCargadoImagen = [];
    this.isCargandoImagen = [];
  }

  ngOnInit() { }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      console.log('addedToQueue', output.file.name);
      this.isCargadoImagen.push(false);
      this.isCargandoImagen.push(false);
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.isCargandoImagen[index] = true;
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile, indice) => {
        if (file !== output.file) {
          return true;
        } else {
          this.isCargadoImagen.splice(indice, 1);
          this.isCargandoImagen.splice(indice, 1);
          return false;
        }

      });
    } else if (output.type === 'removedAll') {
      this.isCargadoImagen = [];
      this.isCargandoImagen = [];
      this.files = [];
    } else if (output.type === 'done') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.isCargadoImagen[index] = true;
      this.isCargandoImagen[index] = false;
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: environment.serverUrl + 'api/v1/imagen/factura',
      method: 'POST',
      fieldName: 'imagen'
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  cancelarTodoSubirArchivo(): void {
    const event: UploadInput = {
      type: 'cancelAll'
    };
    this.uploadInput.emit(event);
  }

  /**
   * Subir archivo al servidor
   *
   * @param {number} indiceArchivo indice del archivo a subir
   * @memberof CrudFacturaComponent
   */
  subirArchivo(indiceArchivo: number): void {
    const event: UploadInput = {
      type: 'uploadFile',
      url: environment.serverUrl + 'api/v1/imagen/factura',
      method: 'POST',
      fieldName: 'imagen',
      file: this.files[indiceArchivo]
    };

    this.uploadInput.emit(event);
  }
}
