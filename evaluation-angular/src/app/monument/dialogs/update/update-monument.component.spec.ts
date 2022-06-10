import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMonumentComponent } from './update-monument.component';

describe('UpdateComponent', () => {
  let component: UpdateMonumentComponent;
  let fixture: ComponentFixture<UpdateMonumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMonumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMonumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
