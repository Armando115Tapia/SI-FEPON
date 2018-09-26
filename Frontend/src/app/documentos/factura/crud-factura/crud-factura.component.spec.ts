import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFacturaComponent } from './crud-factura.component';
import { SharedModule } from '@app/shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  NgbModule,
  NgbCalendar,
  NgbDatepickerI18n,
  NgbInputDatepicker,
  NgbDateParserFormatter,
  NgbDateAdapter
} from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerService } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-service';
import { TagInputModule } from 'ngx-chips';
import { CrudFacturaService } from '@app/documentos/factura/crud-factura/servicios/crud-factura.service';

describe('CrudFacturaComponent', () => {
  let component: CrudFacturaComponent;
  let fixture: ComponentFixture<CrudFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, SharedModule, HttpClientTestingModule, TagInputModule],
      providers: [
        NgbCalendar,
        NgbInputDatepicker,
        NgbDatepickerService,
        NgbDatepickerI18n,
        NgbDateParserFormatter,
        NgbDateAdapter,
        CrudFacturaService
      ],
      declarations: [CrudFacturaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
