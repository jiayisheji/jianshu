import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesComponent } from './likes.component';

describe('LikesComponent', () => {
  let component: LikesComponent;
  let fixture: ComponentFixture<LikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
