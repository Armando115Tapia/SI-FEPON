import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFacturaComponent } from './crud-factura.component';

describe('FacturaComponent', () => {
  let component: CrudFacturaComponent;
  let fixture: ComponentFixture<CrudFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudFacturaComponent ]
    })
    .compileComponents();
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
