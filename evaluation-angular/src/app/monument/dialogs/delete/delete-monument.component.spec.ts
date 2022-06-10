import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteMonumentComponent } from './delete-monument.component';


describe('Delete2Component', () => {
  let component: DeleteMonumentComponent;
  let fixture: ComponentFixture<DeleteMonumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMonumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMonumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
