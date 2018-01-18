import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

import { SignupService } from './servicios/signup.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    SignupRoutingModule,
    FormsModule,
    DropdownModule,
    CheckboxModule
  ],
  declarations: [
    SignupComponent
  ],
  providers: [SignupService]
})
export class SignupModule { }
