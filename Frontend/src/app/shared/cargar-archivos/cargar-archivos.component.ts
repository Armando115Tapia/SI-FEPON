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
  @ViewChild('file') file: ElementRef;
  public files: File[] = [];

  progress: Object;
  isUploading = false;
  isUploadSuccessful = false;
  isCargarBotonActivo = false;

  constructor(public uploadService: CargarArchivosService) {}

  ngOnInit() {}

  addFiles() {
    this.file.nativeElement.click();
  }

  seleccionarImagenes() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        this.files.push(files[key]);
      }
    }
  }

  cargarTodasLasImagenes() {
    // if everything was uploaded already, just close the dialog
    if (this.isUploadSuccessful) {
      this.isUploading = false;
      /// return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.isUploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files);

    // convert the progress map into an array
    const allProgressObservables = [];

    for (const key in this.progress) {
      if (this.progress.hasOwnProperty(key)) {
        allProgressObservables.push(this.progress[key].progress);
      }
    }

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      // this.canBeClosed = true;
      // this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.isUploadSuccessful = true;

      // ... and the component is no longer uploading
      this.isUploading = false;
      this.file.nativeElement.value = '';
      this.files = [];
    });
  }
}
