/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarInputsComponent } from './bar-inputs.component';

describe('BarInputsComponent', () => {
  let component: BarInputsComponent;
  let fixture: ComponentFixture<BarInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
