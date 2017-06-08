import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailResetComponent } from './email-reset.component';

describe('EmailResetComponent', () => {
  let component: EmailResetComponent;
  let fixture: ComponentFixture<EmailResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
