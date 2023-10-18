import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraComponent } from './gra.component';

describe('GraComponent', () => {
  let component: GraComponent;
  let fixture: ComponentFixture<GraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
