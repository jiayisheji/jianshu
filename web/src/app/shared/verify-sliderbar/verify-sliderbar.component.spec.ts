import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySliderbarComponent } from './verify-sliderbar.component';

describe('VerifySliderbarComponent', () => {
  let component: VerifySliderbarComponent;
  let fixture: ComponentFixture<VerifySliderbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifySliderbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifySliderbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
