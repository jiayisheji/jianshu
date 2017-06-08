import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePlaceholderComponent } from './article-placeholder.component';

describe('ArticlePlaceholderComponent', () => {
  let component: ArticlePlaceholderComponent;
  let fixture: ComponentFixture<ArticlePlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
