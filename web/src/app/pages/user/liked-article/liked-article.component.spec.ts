import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedArticleComponent } from './liked-article.component';

describe('LikedArticleComponent', () => {
  let component: LikedArticleComponent;
  let fixture: ComponentFixture<LikedArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
