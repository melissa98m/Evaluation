import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMonumentComponent } from './one-monument.component';

describe('OneMonumentComponent', () => {
  let component: OneMonumentComponent;
  let fixture: ComponentFixture<OneMonumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneMonumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneMonumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
