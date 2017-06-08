import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistComponent } from './blacklist.component';

describe('BlacklistComponent', () => {
  let component: BlacklistComponent;
  let fixture: ComponentFixture<BlacklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlacklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
