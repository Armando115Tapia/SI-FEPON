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
  private _files: File[] = [];
  private _archivosPorSubir: File[] = [];
  private _progress: Object;
  private _isUploading: boolean;
  private _isUploadSuccessful: boolean;
  private _isCargandoImagen: boolean[] = [];
  private _isCargadoImagen: boolean[] = [];

  constructor(private uploadService: CargarArchivosService) {
    this.isUploading = false;
    this.isUploadSuccessful = false;
  }

  ngOnInit() {}

  /**
   * Agregar las imagenes seleccionadas a la lista archivos por subir y lista
   * archivos general
   *
   * @memberof CargarArchivosComponent
   */
  agregarImagenesSeleccionadasToArchivosPorSubir() {
    const archivosPorSubir = this.file.nativeElement.files;
    for (const key in archivosPorSubir) {
      if (archivosPorSubir.hasOwnProperty(key)) {
        this.files.push(<File>archivosPorSubir[key]);
        this.archivosPorSubir.push(<File>archivosPorSubir[key]);
      }
    }
  }



  /**
   * Carga todas las imagenes que se encuentran en las lista de
   * archivos por subir al servidor y genera estados cargando, cargado
   *
   * @memberof CargarArchivosComponent
   */
  cargarTodasLasImagenes() {
    this.isUploading = true;
    this.progress = this.uploadService.upload(this.archivosPorSubir);
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

    // Una vez completado la subida de archivos
    forkJoin(allProgressObservables).subscribe(end => {
      this.isUploadSuccessful = true;
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
    });
  }

  /**
   * Cancela todas las imagenes en estado subiendo
   *
   * @memberof CargarArchivosComponent
   */
  cancelarTodasLasImagenes() {
    this.uploadService.cancelarPeticiones();
    this.isUploading = false;
  }

  /**
   * Vacía todos los archivos incluidos en la lista de
   * archivos y input de archivos
   *
   * @memberof CargarArchivosComponent
   */
  vaciarArchivosAndInput() {
    this.files = [];
    this.file.nativeElement.value = '';
  }

  /**
   * Getter files
   * Lista de archivos que estan en la lista de todos los archivos
   * @return {File[] }
   */
  public get files(): File[] {
    return this._files;
  }

  /**
   * Getter archivosPorSubir
   * Lista de archivos por subir
   * @return {File[] }
   */
  public get archivosPorSubir(): File[] {
    return this._archivosPorSubir;
  }

  /**
   * Getter progress
   * Objeto que contiene el progreso y el objeto con la informacion de la imagen
   * @return {Object}
   */
  public get progress(): Object {
    return this._progress;
  }

  /**
   * Getter isUploading
   * @return {boolean}
   */
  public get isUploading(): boolean {
    return this._isUploading;
  }

  /**
   * Getter isUploadSuccessful
   * @return {boolean}
   */
  public get isUploadSuccessful(): boolean {
    return this._isUploadSuccessful;
  }

  /**
   * Getter isCargandoImagen
   * @return {boolean[] }
   */
  public get isCargandoImagen(): boolean[] {
    return this._isCargandoImagen;
  }

  /**
   * Getter isCargadoImagen
   * @return {boolean[] }
   */
  public get isCargadoImagen(): boolean[] {
    return this._isCargadoImagen;
  }

  /**
   * Setter files
   * @param {File[] } value
   */
  public set files(value: File[]) {
    this._files = value;
  }

  /**
   * Setter archivosPorSubir
   * @param {File[] } value
   */
  public set archivosPorSubir(value: File[]) {
    this._archivosPorSubir = value;
  }

  /**
   * Setter progress
   * @param {Object} value
   */
  public set progress(value: Object) {
    this._progress = value;
  }

  /**
   * Setter isUploading
   * @param {boolean} value
   */
  public set isUploading(value: boolean) {
    this._isUploading = value;
  }

  /**
   * Setter isUploadSuccessful
   * @param {boolean} value
   */
  public set isUploadSuccessful(value: boolean) {
    this._isUploadSuccessful = value;
  }

  /**
   * Setter isCargandoImagen
   * @param {boolean[] } value
   */
  public set isCargandoImagen(value: boolean[]) {
    this._isCargandoImagen = value;
  }

  /**
   * Setter isCargadoImagen
   * @param {boolean[] } value
   */
  public set isCargadoImagen(value: boolean[]) {
    this._isCargadoImagen = value;
  }
}
