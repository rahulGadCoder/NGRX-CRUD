import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadarComponent } from './headar.component';

describe('HeadarComponent', () => {
  let component: HeadarComponent;
  let fixture: ComponentFixture<HeadarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
