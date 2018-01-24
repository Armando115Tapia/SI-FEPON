import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Logger } from '../core/logger.service';
import { I18nService } from '../core/i18n.service';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { SignupService } from './servicios/signup.service';

const log = new Logger('Signup');

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  version: string = environment.version;
  error: string;
  signupForm: FormGroup;
  isLoading = false;
  isEstudianteEPN = false;
  opcionesLenguajeDropdown: Array<{ 'label': string, 'value': string }>;
  opcionesCarreraDropdown: Array<{ 'label': string, 'value': number }>;
  opcionesGeneroDropdown: Array<{ 'label': string, 'value': string}>;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService,
              private signupService: SignupService) {
    this.opcionesLenguajeDropdown = [];
    this.crearFormulario();
  }

  ngOnInit() {
    this.opcionesLenguajeDropdown = this.generarOpcionesLenguajeDropdown();
    this.generarOpcionesCarreraDropdown();
    this.generarOpcionesGeneroDropdown();
  }

  /**
   * Método para crear un formulario
   *
   * @memberof SignupComponent
   */
  crearFormulario() {
    this.signupForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      cedula: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      numeroTelefono: ['', Validators.required],
      numeroUnico: ['', null],
      carrera: ['', null]
    });
  }

  /**
   * Método para el registro de estudiante al sistema
   *
   * @memberof SignupComponent
   */
  signin() {
    this.isLoading = true;

    // set null si carrera no esta presente
    if (this.signupForm.value.carrera === '') {
      this.signupForm.value.carrera = null;
    }

    this.signupService.crearUsuario(this.signupForm.value)
      .pipe(
        finalize(() => {
          this.signupForm.markAsPristine();
          this.isLoading = false;
        }),
        map(res => res.json())
      )
      .subscribe(
        data => {
          log.debug(`${data.respuesta.usuario.email} creación exitosa`);
          this.authenticationService.setCredenciales(data.respuesta)
            .subscribe(
              data2 => {
                this.router.navigate(['/'], { replaceUrl: true });
              },
              error2 => {
                log.error('Error set Credenciales usuario');
              }
            );
        },
        error => {
          log.debug('Error creando usuario');
        }
      );
  }

  /**
   * Genera opciones de idioma de dropdown
   *
   * @private
   * @returns {Array<{ label: string, value: string }>} Opciones de idioma
   * @memberof SignupComponent
   */

  private generarOpcionesLenguajeDropdown(): Array<{ label: string, value: string }>  {
    let opcionesLenguaje: Array<{ label: string, value: string }>;
    opcionesLenguaje = [];

    const lenguajes = this.i18nService.supportedLanguages;
    for (let indice = 0; indice < lenguajes.length; indice++) {
      const lenguaje = lenguajes[indice];
      opcionesLenguaje.push({'label': lenguaje, 'value': lenguaje });
    }

    return opcionesLenguaje;
  }

  /**
   * Cambia el idioma a ser utilizado en la aplicacion
   *
   * @param {*} evento Evento de primeng evento.value contiene el contenido seleccionado del dropdown
   * @memberof SignupComponent
   */

  setLanguage(evento: any) {
    this.i18nService.language = evento.value;
  }

  /**
   * Evento que ocurre cada cambio de opción de checkbox
   *
   * @param {boolean} checked Representa el estado del checkbox
   * @memberof SignupComponent
   */
  cambioCheckboxIsEstudiante(checked: boolean) {
    if (checked) {
      this.signupForm.get('numeroUnico').setValidators(Validators.required);
      this.signupForm.get('carrera').setValidators(Validators.required);
    } else {
      this.signupForm.get('numeroUnico').setValidators(null);
      this.signupForm.get('carrera').setValidators(null);
    }
    this.signupForm.get('numeroUnico').updateValueAndValidity();
    this.signupForm.get('carrera').updateValueAndValidity();
  }

  /**
   * Genera las opciones para el dropdown de carrera
   *
   * @private
   * @memberof SignupComponent
   */
  private generarOpcionesCarreraDropdown(): void {
    const opcionesCarrera: Array<{ label: string, value: number }> = [];
    this.signupService.descargarCarrerasDeUsuario()
      .pipe(map(res => res.json()))
      .subscribe(
        data => {
          for (let indice = 0; indice < data.registros.length; indice++) {
            const rol = data.registros[indice];
            opcionesCarrera.push({'label': rol.nombre, 'value': rol.id });
          }
          this.opcionesCarreraDropdown = opcionesCarrera;
        },
        error => {
          log.error(error);
        }
      );
  }

  /**
   * Generar las opciones para el dropdown de genero
   *
   * @private
   * @memberof SignupComponent
   */
  private generarOpcionesGeneroDropdown(): void {
    const opcionesGenero: Array<{ label: string, value: string}> = [];
    opcionesGenero.push({label: 'Masculino', value: 'Masculino'});
    opcionesGenero.push({label: 'Femenino', value: 'Femenino'});
    opcionesGenero.push({label: 'Otro', value: 'Otro'});

    this.opcionesGeneroDropdown = opcionesGenero;
  }
}
