import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyComponent } from './monthly.component';

describe('MonthlyComponent', () => {
  let component: MonthlyComponent;
  let fixture: ComponentFixture<MonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
