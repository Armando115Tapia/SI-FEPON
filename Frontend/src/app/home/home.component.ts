import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nombreUsuario: string;
  isLoading: boolean;


  constructor(private autenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isLoading = true;
    this.nombreUsuario = this.autenticationService.credentials.usuario.nombre;
  }

}
