import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoNuevoComponent } from './proyecto-nuevo.component';

describe('ProyectoNuevoComponent', () => {
  let component: ProyectoNuevoComponent;
  let fixture: ComponentFixture<ProyectoNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
