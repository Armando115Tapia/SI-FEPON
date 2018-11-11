import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEtiquetaComponent } from './crud-etiqueta.component';

describe('CrudEtiquetaComponent', () => {
  let component: CrudEtiquetaComponent;
  let fixture: ComponentFixture<CrudEtiquetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudEtiquetaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
