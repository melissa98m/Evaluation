import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRestaurantComponent } from './all-restaurants.component';

describe('AllRestaurantComponent', () => {
  let component: AllRestaurantComponent;
  let fixture: ComponentFixture<AllRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
