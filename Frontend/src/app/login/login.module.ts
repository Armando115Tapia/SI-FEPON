import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/primeng';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './servicios/login.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    LoginRoutingModule,
    FormsModule,
    DropdownModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [LoginService]
})
export class LoginModule { }
