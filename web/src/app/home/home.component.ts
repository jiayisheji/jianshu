import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../core/article-service/article.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private articleService:ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles(1, 20, '')
      .subscribe(
        user => console.log(user)
      );
    this.articleService.setArticles({
      content: '111'
    }).subscribe(
      user => console.log(user)
    );
  }
  
}
