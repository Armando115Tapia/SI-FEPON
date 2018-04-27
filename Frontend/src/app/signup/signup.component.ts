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
import { IEventoDropDown } from '../shared/modelos';

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
  opcionesLenguajeDropdown: IEventoDropDown[];
  opcionesCarreraDropdown: IEventoDropDown[];
  opcionesGeneroDropdown: IEventoDropDown[];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService,
              private signupService: SignupService) {
    this.opcionesCarreraDropdown = [
      // TODO: Completar todas las carreras
      {label: 'Ing. Sistemas', value: 'Ing. Sistemas'}
    ];
    this.crearFormulario();
  }

  ngOnInit() {
    this.opcionesLenguajeDropdown = this.generarOpcionesLenguajeDropdown();
    this.generarOpcionesGeneroDropdown();
    this.signupForm.get('genero').setValue('Femenino');
    this.signupForm.get('carrera').setValue('Ing. Sistemas');
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

    const nuevoUsuario = this.signupForm.value;

    if (this.isEstudianteEPN) {
      nuevoUsuario['facultad'] = this.inferirFacultad(nuevoUsuario.carrera);
    } else {
      nuevoUsuario['facultad'] = '';
      nuevoUsuario['numeroUnico'] = '';
    }

    this.signupService.crearUsuario(nuevoUsuario)
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
   * Generar las opciones para el dropdown de genero
   *
   * @private
   * @memberof SignupComponent
   */
  private generarOpcionesGeneroDropdown(): void {
    const opcionesGenero: IEventoDropDown[] = [];
    opcionesGenero.push({label: 'Masculino', value: 'Masculino'});
    opcionesGenero.push({label: 'Femenino', value: 'Femenino'});
    opcionesGenero.push({label: 'Otro', value: 'Otro'});

    this.opcionesGeneroDropdown = opcionesGenero;
  }

  /**
   * Infiere la facultad segun la carrera
   *
   * @private
   * @param {string} carrera Nombre de la carrera
   * @returns {string} Nombre de la facultad
   * @memberof SignupComponent
   */
  private inferirFacultad(carrera: string): string {
    let facultad = '';
    switch (carrera) {
      case 'Ing. Sistemas':
        facultad = 'Ingenieria en sistemas y computacion';
        break;
      default:
        break;
    }

    return facultad;
  }
}
