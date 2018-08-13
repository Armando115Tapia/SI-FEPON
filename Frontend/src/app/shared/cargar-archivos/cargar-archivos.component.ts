import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CargarArchivosService } from '@app/shared/cargar-archivos/cargar-archivos.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cargar-archivos',
  templateUrl: './cargar-archivos.component.html',
  styleUrls: ['./cargar-archivos.component.scss'],
  providers: [CargarArchivosService]
})
export class CargarArchivosComponent implements OnInit {
  @ViewChild('file')
  file: ElementRef;
  public files: File[] = [];
  archivosPorSubir: File[] = [];

  progress: Object;
  isUploading = false;
  isUploadSuccessful = false;
  isCargarBotonActivo = false;
  isCargandoImagen: boolean[] = [];
  isCargadoImagen: boolean[] = [];

  constructor(public uploadService: CargarArchivosService) { }

  ngOnInit() {}

  addFiles() {
    this.file.nativeElement.click();
  }

  seleccionarImagenes() {
    const archivosPorSubir = this.file.nativeElement.files;
    for (const key in archivosPorSubir) {
      if (archivosPorSubir.hasOwnProperty(key)) {
        this.files.push(<File>archivosPorSubir[key]);
        this.archivosPorSubir.push(<File>archivosPorSubir[key]);
      }
    }
  }

  cargarTodasLasImagenes() {
    // if everything was uploaded already, just close the dialog
    // if (this.isUploadSuccessful) {
    // this.isUploading = false;
      /// return this.dialogRef.close();
    // }

    // set the component state to "uploading"
    this.isUploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.archivosPorSubir);

    // convert the progress map into an array
    const allProgressObservables = [];
    const allImagenObservables = [];

    for (const key in this.progress) {
      if (this.progress.hasOwnProperty(key)) {
        allProgressObservables.push(this.progress[key].progress);
        allImagenObservables.push(this.progress[key].imagen);
      }
    }

    for (const archivo of this.archivosPorSubir) {
      this.progress[archivo.name].progress.subscribe((porcentajeProgreso: any) => {
        const indiceArchivo = this.files.findIndex(file => file.name === archivo.name);
        this.isCargandoImagen[indiceArchivo] = true;
      });
    }

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      // this.canBeClosed = true;
      // this.dialogRef.disableClose = false;
      console.log('end', end);
      // ... the upload was successful...
      this.isUploadSuccessful = true;

      // ... and the component is no longer uploading
      this.isUploading = false;
      this.file.nativeElement.value = '';
      this.archivosPorSubir = [];
      this.uploadService.reiniciarArregloPeticionesImagen();
    });

    forkJoin(allImagenObservables).subscribe(imagenes => {
      // Agregar imagenes
      for (const imagen of imagenes) {
        const nombreArchivo = imagen['nombreArchivoOriginal'];
        const indiceArchivo = this.files.findIndex(file => file.name === nombreArchivo);
        this.isCargandoImagen[indiceArchivo] = false;
        this.isCargadoImagen[indiceArchivo] = true;
      }

      console.log('imagenes', imagenes);
    });
  }

  cancelarTodasLasImagenes() {
    this.uploadService.cancelarPeticiones();
    this.isUploading = false;
  }

  vaciarTodos() {
    this.files = [];
    this.file.nativeElement.value = '';

  }
}
