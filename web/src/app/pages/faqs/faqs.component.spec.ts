import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsComponent } from './faqs.component';

describe('FaqsComponent', () => {
  let component: FaqsComponent;
  let fixture: ComponentFixture<FaqsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
