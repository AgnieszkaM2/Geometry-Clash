import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanszaComponent } from './plansza.component';

describe('PlanszaComponent', () => {
  let component: PlanszaComponent;
  let fixture: ComponentFixture<PlanszaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanszaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanszaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
