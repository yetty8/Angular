import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VolcanoComponent } from './volcano.component';

describe('VolcanoComponent', () => {
  let component: VolcanoComponent;
  let fixture: ComponentFixture<VolcanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolcanoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VolcanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
