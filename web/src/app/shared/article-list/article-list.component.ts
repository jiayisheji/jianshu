import {Component, OnInit, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy} from '@angular/core';
import {ArticleListService} from './article-list.service';
import {Subscription} from 'rxjs/Subscription';
import {ArticleItem} from './article-item';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  providers: [
    ArticleListService
  ]
})
export class ArticleListComponent implements OnInit, OnChanges {
  @Input('request') request = '/';
  public isScrolled = false;
  public articleList: Array<ArticleItem> = [];
  public loading = true;
  private disposeArticle: Subscription;

  constructor(private articleListService: ArticleListService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.articleList = [];
    this.getArticle(this.request);
    console.log(this.request, changes);
  }

  getArticle(request: string) {
    const _this = this;
    this.loading = true;
    this.articleListService.get(request).subscribe((articleList) => {
      _this.loading = false;
      _this.articleList.push.apply(_this.articleList, articleList.data);
    });
  }

  loadMore() {
    this.getArticle(this.request)
  }
}
