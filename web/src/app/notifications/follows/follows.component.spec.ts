import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowsComponent } from './follows.component';

describe('FollowsComponent', () => {
  let component: FollowsComponent;
  let fixture: ComponentFixture<FollowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
