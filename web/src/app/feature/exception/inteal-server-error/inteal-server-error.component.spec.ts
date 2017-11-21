import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntealServerErrorComponent } from './inteal-server-error.component';

describe('IntealServerErrorComponent', () => {
  let component: IntealServerErrorComponent;
  let fixture: ComponentFixture<IntealServerErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntealServerErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntealServerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
