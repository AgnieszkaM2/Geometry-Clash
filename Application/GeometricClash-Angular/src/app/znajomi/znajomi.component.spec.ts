import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZnajomiComponent } from './znajomi.component';

describe('ZnajomiComponent', () => {
  let component: ZnajomiComponent;
  let fixture: ComponentFixture<ZnajomiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZnajomiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZnajomiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
