import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxiosOptionsComponent } from './axios-options.component';

describe('AxiosOptionsComponent', () => {
  let component: AxiosOptionsComponent;
  let fixture: ComponentFixture<AxiosOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AxiosOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AxiosOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
