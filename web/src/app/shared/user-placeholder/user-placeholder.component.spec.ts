import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlaceholderComponent } from './user-placeholder.component';

describe('UserPlaceholderComponent', () => {
  let component: UserPlaceholderComponent;
  let fixture: ComponentFixture<UserPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
