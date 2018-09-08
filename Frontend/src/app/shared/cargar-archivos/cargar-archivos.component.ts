import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CargarArchivosService } from '@app/shared/cargar-archivos/cargar-archivos.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TipoImagen, IModeloArchivo } from '@app/shared/utilidades.util';

@Component({
  selector: 'app-cargar-archivos',
  templateUrl: './cargar-archivos.component.html',
  styleUrls: ['./cargar-archivos.component.scss'],
  providers: [CargarArchivosService]
})
export class CargarArchivosComponent implements OnInit {
  @ViewChild('file')
  file: ElementRef;
  private _archivosAlmacenados: IModeloArchivo[] = [];
  private _archivosPorSubir: File[] = [];
  private _progress: Object;
  private _isUploading: boolean;
  private _isUploadSuccessful: boolean;
  private _isCargandoImagen: boolean[] = [];

  constructor(private cargarArchivosService: CargarArchivosService) {
    this.isUploading = false;
    this.isUploadSuccessful = false;
  }

  ngOnInit() {}

  /**
   * Agregar las imagenes seleccionadas a la lista archivos por subir
   *
   * @memberof CargarArchivosComponent
   */
  agregarImagenesSeleccionadasToArchivosPorSubir() {
    const archivosPorSubir = this.file.nativeElement.files;
    for (const key in archivosPorSubir) {
      if (archivosPorSubir.hasOwnProperty(key)) {
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
    this.progress = this.cargarArchivosService.upload(this.archivosPorSubir);
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
        const indiceArchivo = this.archivosPorSubir.findIndex(file => file.name === archivo.name);
        this.isCargandoImagen[indiceArchivo] = true;
      });
    }

    // Una vez completado la subida de archivos
    forkJoin(allProgressObservables).subscribe(end => {
      this.isUploadSuccessful = true;
      this.isUploading = false;
      this.file.nativeElement.value = '';
      this.archivosPorSubir = [];
      this.cargarArchivosService.reiniciarArregloPeticionesImagen();
    });

    forkJoin(allImagenObservables).subscribe((imagenes: IModeloArchivo[]) => {
      // Agregar imagenes
      for (const imagen of imagenes) {
        const nombreArchivo = imagen['nombreArchivoOriginal'];
        const indiceArchivo = this.archivosPorSubir.findIndex(file => file.name === nombreArchivo);

        this.archivosAlmacenados.push(imagen);
        this.eliminarArchivoPorSubir(indiceArchivo);

        this.isCargandoImagen[indiceArchivo] = false;
      }
    });
  }

  /**
   * Cancela todas las imagenes en estado subiendo
   *
   * @memberof CargarArchivosComponent
   */
  cancelarTodasLasImagenes() {
    this.cargarArchivosService.cancelarPeticiones();
    this.isUploading = false;
  }

  cancelarSubidaImagen(indiceArchivo: number) {
    this.cargarArchivosService.cancelaPeticion(this.archivosPorSubir[indiceArchivo].name);
    this.isCargandoImagen[indiceArchivo] = false;
  }

  /**
   * Vacía todos los archivos incluidos en la lista de
   * archivos y input de archivos
   *
   * @memberof CargarArchivosComponent
   */
  vaciarTodosLosArchivosPorSubirAndInput() {
    this.file.nativeElement.value = '';
    this.archivosPorSubir = [];
    this.isCargandoImagen = [];
  }

  subirArchivoIndividualmente(indiceArchivo: number) {
    this.cargarImangen(this.archivosPorSubir[indiceArchivo], indiceArchivo);
  }

  cargarImangen(archivoPorSubir: File, indiceArchivo: number) {
    const progreso = this.cargarArchivosService.upload([archivoPorSubir]);
    progreso[archivoPorSubir.name].progress
      .pipe(
        finalize(() => {
          this.isCargandoImagen[indiceArchivo] = false;
          this.eliminarArchivoPorSubir(indiceArchivo);
        })
      )
      .subscribe(porcentajeProgreso => {
        this.isCargandoImagen[indiceArchivo] = true;
      });

    progreso[archivoPorSubir.name].imagen.pipe(finalize(() => {})).subscribe((modeloImagen: IModeloArchivo) => {
      this.archivosAlmacenados.push(modeloImagen);
    });
  }

  eliminarArchivoPorSubir(indiceArchivo: number) {
    const archivoAEliminar = this.archivosPorSubir[indiceArchivo];
    this.archivosPorSubir = this.archivosPorSubir.filter(archivo => archivo.name !== archivoAEliminar.name);
    this.isCargandoImagen.splice(indiceArchivo, 1);
  }

  eliminarArchivoDeBaseDeDatos(indiceArchivo: number) {
    const archivo = this.archivosAlmacenados[indiceArchivo];
    this.cargarArchivosService
      .eliminarArchivo(TipoImagen.facturas, archivo.nombreArchivo)
      .subscribe(data => console.log(data), error => console.log(error));
    this.archivosAlmacenados.splice(indiceArchivo, 1);
  }

  /**
   * Getter archivosAlmacenados
   * @return {IModeloArchivo[] }
   */
  public get archivosAlmacenados(): IModeloArchivo[] {
    return this._archivosAlmacenados;
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
   * Setter archivosAlmacenados
   * @param {IModeloArchivo[] } value
   */
  public set archivosAlmacenados(value: IModeloArchivo[]) {
    this._archivosAlmacenados = value;
  }
}
