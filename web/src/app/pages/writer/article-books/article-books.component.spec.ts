import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBooksComponent } from './article-books.component';

describe('ArticleBooksComponent', () => {
  let component: ArticleBooksComponent;
  let fixture: ComponentFixture<ArticleBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
