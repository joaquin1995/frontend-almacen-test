import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaNuevoComponent } from './etapa-nuevo.component';

describe('EtapaNuevoComponent', () => {
  let component: EtapaNuevoComponent;
  let fixture: ComponentFixture<EtapaNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtapaNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapaNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
