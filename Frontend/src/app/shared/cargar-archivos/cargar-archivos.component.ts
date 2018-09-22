import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CargarArchivosService } from '@app/shared/cargar-archivos/cargar-archivos.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TipoImagen, IModeloArchivo, IModeloArchivoCompleto } from '@app/shared/utilidades.util';
import { environment } from '@env/environment';

@Component({
  selector: 'app-cargar-archivos',
  templateUrl: './cargar-archivos.component.html',
  styleUrls: ['./cargar-archivos.component.scss'],
  providers: [CargarArchivosService]
})
export class CargarArchivosComponent implements OnInit {
  @ViewChild('file')
  file: ElementRef;
  private _archivosAlmacenados: IModeloArchivoCompleto[] = [];
  private _archivosPorSubir: File[] = [];
  private _isCargando: boolean;
  private _isCargandoServidor: boolean;
  private _isCargandoImagen: boolean[] = [];

  constructor(private cargarArchivosService: CargarArchivosService) {
    this.isCargando = false;
    this.isCargandoServidor = false;
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
    this.file.nativeElement.value = '';
  }

  /**
   * Carga todas las imagenes que se encuentran en las lista de
   * archivos por subir al servidor
   *
   * @memberof CargarArchivosComponent
   */
  cargarTodasLasImagenes() {
    this.isCargando = true;
    this.isCargandoServidor = true;

    const observables = this.cargarArchivosService.upload(this.archivosPorSubir);
    const observablesImagen = [];

    for (const key in observables) {
      if (observables.hasOwnProperty(key)) {
        observablesImagen.push(observables[key].imagen);
      }
    }

    for (const archivo of this.archivosPorSubir) {
      observables[archivo.name].imagen.subscribe(() => {
        const indiceArchivo = this.archivosPorSubir.findIndex(file => file.name === archivo.name);
        this.isCargandoImagen[indiceArchivo] = true;
      });
    }

    // Una vez completado la subida de archivos
    forkJoin(observablesImagen).subscribe((imagenes: IModeloArchivoCompleto[]) => {
      this.isCargandoServidor = false;
      this.cargarArchivosService.reiniciarArregloPeticionesImagen();
      this.vaciarTodosLosArchivosPorSubir();

      // Agregar imagenes
      for (const modeloImagen of imagenes) {
        modeloImagen['url'] = `${environment.serverUrl}images/facturas/${modeloImagen.nombreArchivo}`;

        setTimeout(() => {
          this.isCargando = false;
          this.archivosAlmacenados.push(modeloImagen);
        }, 3000);
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
    this.isCargando = false;
  }

    cancelarSubidaImagen(indiceArchivo: number) {
    this.cargarArchivosService.cancelaPeticion(this.archivosPorSubir[indiceArchivo].name);
    this.isCargandoImagen[indiceArchivo] = false;
  }

  /**
   * Vacía todos los archivos incluidos en la lista de
   * archivos y isCargandoImagen
   *
   * @memberof CargarArchivosComponent
   */
  vaciarTodosLosArchivosPorSubir() {
    this.archivosPorSubir = [];
    this.isCargandoImagen = [];
  }

  subirArchivoIndividualmente(indiceArchivo: number) {
    this.cargarImagen(this.archivosPorSubir[indiceArchivo], indiceArchivo);
  }

  cargarImagen(archivoPorSubir: File, indiceArchivo: number) {
    this.isCargando = true;
    this.isCargandoServidor = true;
    this.isCargandoImagen[indiceArchivo] = true;
    const observables = this.cargarArchivosService.upload([archivoPorSubir]);

    observables[archivoPorSubir.name].imagen
      .pipe(
        finalize(() => {
          this.isCargandoServidor = false;
          this.cargarArchivosService.reiniciarArregloPeticionesImagen();
          this.isCargandoImagen[indiceArchivo] = false;
          this.eliminarArchivoPorSubir(indiceArchivo);
        })
      )
      .subscribe((modeloImagen: IModeloArchivoCompleto) => {
        modeloImagen['url'] = `${environment.serverUrl}images/facturas/${modeloImagen.nombreArchivo}`;
        setTimeout(() => {
          this.isCargando = false;
          this.archivosAlmacenados.push(modeloImagen);
        }, 3000);
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
   * @return {IModeloArchivoCompleto[] }
   */
  public get archivosAlmacenados(): IModeloArchivoCompleto[] {
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
   * Getter isCargando
   * Muestra si se encuentra cargado incluyendo carga de imagen y del servidor
   * @return {boolean}
   */
  public get isCargando(): boolean {
    return this._isCargando;
  }

  /**
   * Getter isCargandoServidor
   * Muestra si esta cargando en el servidor
   * @return {boolean}
   */
  public get isCargandoServidor(): boolean {
    return this._isCargandoServidor;
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
   * Setter isCargando
   * @param {boolean} value
   */
  public set isCargando(value: boolean) {
    this._isCargando = value;
  }

  /**
   * Setter isCargandoServidor
   * @param {boolean} value
   */
  public set isCargandoServidor(value: boolean) {
    this._isCargandoServidor = value;
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
   * @param {IModeloArchivoCompleto[] } value
   */
  public set archivosAlmacenados(value: IModeloArchivoCompleto[]) {
    this._archivosAlmacenados = value;
  }
}
