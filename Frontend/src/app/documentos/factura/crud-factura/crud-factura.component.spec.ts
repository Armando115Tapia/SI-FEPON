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

describe('CrudFacturaComponent', () => {
  let component: CrudFacturaComponent;
  let fixture: ComponentFixture<CrudFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule, SharedModule, HttpClientTestingModule],
      providers: [
        NgbCalendar,
        NgbInputDatepicker,
        NgbDatepickerService,
        NgbDatepickerI18n,
        NgbDateParserFormatter,
        NgbDateAdapter
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
