import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiadomosciComponent } from './wiadomosci.component';

describe('WiadomosciComponent', () => {
  let component: WiadomosciComponent;
  let fixture: ComponentFixture<WiadomosciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiadomosciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WiadomosciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
