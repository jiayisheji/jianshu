import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  private article: any;
  ngOnInit() {
    this.article = {
      author: {
        avatar: "../assets/images/avatar_defaul.png",
        _id: "593cef410f6fd7504c608846",
        nickname: "简黛玉"
      },
      title: "最俗气的言情故事",
      created: "2017-06-04 12:16:49.839Z",
      updated: "2017-06-04 12:16:49.839Z",
      content: '## 主命令框 \r F1 或 Ctrl+Shift+P: 打开命令面板。\r - 按一下 Backspace 会进入到 Ctrl+P 模式 \r - 在 Ctrl+P 下输入 > 可以进入 Ctrl+Shift+P 模式 \r - 在 Ctrl+P 窗口下还可以',
      meta: {
        wordage: 12345,
        views_count: 100,
        comments_count: 50,
        likes_count: 10
      },
      test: '<p>test</p>',
      books: {
        _id: "593cef410f6fd7504c608846",
        name: "故事"
      }
    }
  }



}
