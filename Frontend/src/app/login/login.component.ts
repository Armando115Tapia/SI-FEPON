import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Logger } from '../core/logger.service';
import { I18nService } from '../core/i18n.service';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { LoginService } from './servicios/login.service';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;
  opcionesLenguajeDropdown: IEventoDropDown[];
  opcionesRolDropdown: IEventoDropDown[];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private i18nService: I18nService,
              private authenticationService: AuthenticationService,
              private loginService: LoginService) {
    this.opcionesLenguajeDropdown = [];
    this.opcionesRolDropdown = [
      {'label': 'Estudiante', 'value': 'Estudiante'},
      {'label': 'Administrador', 'value': 'Administrador'}
    ];
    this.createForm();

  }

  ngOnInit() {
    this.opcionesLenguajeDropdown = this.generarOpcionesLenguajeDropdown();
    this.loginForm.get('rol').setValue('Estudiante');
  }

  /**
   * Método para autenticacion con servidor
   *
   * @memberof LoginComponent
   */
  login() {
    this.isLoading = true;

    this.loginService.autenticarUsuario(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
          map(res => res.json())
      ).subscribe(
        data => {
          log.debug(`${data.respuesta.usuario.email} autenticación exitosa`);
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
          log.error('Error autenticando usuario ');
        }
      );

    // this.authenticationService.login(this.loginForm.value)
    //   .pipe(finalize(() => {
    //     this.loginForm.markAsPristine();
    //     this.isLoading = false;
    //   }))
    //   .subscribe(credentials => {
    //     log.debug(`${credentials.username} autenticación exitosa`);
    //     this.router.navigate(['/'], { replaceUrl: true });
    //   }, error => {
    //     log.debug(`Login error: ${error}`);
    //     this.error = error;
    //   });
  }

  /**
   * Cambia el idioma a ser utilizado en la aplicacion
   *
   * @param {*} evento Evento de primeng evento.value contiene el contenido seleccionado del dropdown
   * @memberof LoginComponent
   */

  setLanguage(evento: any) {
    this.i18nService.language = evento.value;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  /**
   * Genera opciones de idioma de dropdown
   *
   * @private
   * @returns {IEventoDropDown[]} Opciones de idioma
   * @memberof LoginComponent
   */

  private generarOpcionesLenguajeDropdown(): IEventoDropDown[]  {
    let opcionesLenguaje: IEventoDropDown[];
    opcionesLenguaje = [];

    const lenguajes = this.i18nService.supportedLanguages;
    for (let indice = 0; indice < lenguajes.length; indice++) {
      const lenguaje = lenguajes[indice];
      opcionesLenguaje.push({'label': lenguaje, 'value': lenguaje });
    }

    return opcionesLenguaje;
  }

  /**
   * Método para crear el formulario
   *
   * @private
   * @memberof LoginComponent
   */
  private createForm() {
    this.loginForm = this.formBuilder.group({
      rol: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}

interface IEventoDropDown {
  label: string;
  value: string;
}
