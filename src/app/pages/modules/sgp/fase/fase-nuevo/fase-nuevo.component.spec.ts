import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaseNuevoComponent } from './fase-nuevo.component';

describe('FaseNuevoComponent', () => {
  let component: FaseNuevoComponent;
  let fixture: ComponentFixture<FaseNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaseNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaseNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
