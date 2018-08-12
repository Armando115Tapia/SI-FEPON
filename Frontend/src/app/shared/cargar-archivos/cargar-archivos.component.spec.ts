import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarArchivosComponent } from '@app/shared/cargar-archivos/cargar-archivos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CargarArchivosComponent', () => {
  let component: CargarArchivosComponent;
  let fixture: ComponentFixture<CargarArchivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CargarArchivosComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
