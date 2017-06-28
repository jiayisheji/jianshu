import { Component, OnInit, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { ArticleListService } from './article-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  providers: [
    ArticleListService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent implements OnInit, OnChanges{
  @Input('request') request: string = "/";
  public isScrolled: boolean = false;
  public isScroll: boolean = false;
  public articleList: Array<any> = [];
  public loading: boolean = true;
  private disposeArticle: Subscription;
  constructor(private articleListService:ArticleListService) { }
  ngOnInit() {
    console.log(this.request)
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getArticle(this.request)
    console.log(this.request, changes)
  }
  getArticle(request:string){
    const _this = this;
    this.loading = true;
    this.articleListService.get(request).subscribe((articleList) => {
      _this.loading = false;
      _this.articleList.push.apply(_this.articleList, articleList);
    });
  }
  onScrollDown(data){
    this.loading = true;
    this.isScroll = true;
    console.log('Reached Bottom!!!', data);
    setTimeout(() => {
      console.log(this.articleList);
      if(this.articleList.length >= 20){
        this.isScrolled = true;
      }else{
        this.isScroll = false;
      }
      this.loading = false;
    }, 1000);
  }
  loadMore() {
    this.loading = true;
    this.getArticle(this.request)
  }
}
