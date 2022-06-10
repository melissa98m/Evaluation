import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMonumentsComponent } from './all-monuments.component';

describe('AllMonumentsComponent', () => {
  let component: AllMonumentsComponent;
  let fixture: ComponentFixture<AllMonumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMonumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMonumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
