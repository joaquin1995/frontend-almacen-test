import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FisicaPlurianualComponent } from './fisica-plurianual.component';

describe('FisicaPlurianualComponent', () => {
  let component: FisicaPlurianualComponent;
  let fixture: ComponentFixture<FisicaPlurianualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FisicaPlurianualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FisicaPlurianualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
