import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileResetComponent } from './mobile-reset.component';

describe('MobileResetComponent', () => {
  let component: MobileResetComponent;
  let fixture: ComponentFixture<MobileResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
