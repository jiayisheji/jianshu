import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendUsersComponent } from './recommend-users.component';

describe('RecommendUsersComponent', () => {
  let component: RecommendUsersComponent;
  let fixture: ComponentFixture<RecommendUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
