import {Component, OnInit} from '@angular/core';
import {Route, Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

/**
 * 定义user 接口
 */
export type userInterceptor = {
  nickname: string;
  avatar: string;
  slug: string;
  author: string;
  intro: string;
  gender: number;
  article_count: number;  // 文章总和
  total_wordage: number;   // 总字数
  followers_count: number;    // 粉丝数
  total_likes_count: number;  // 收获喜欢
  following_count: number;  // 关注数
}

export class User {
  constructor(private nickname: string,
              private avatar: string,
              private slug: string,
              private author: string,
              private intro: string,
              private gender: number,
              private article_count: number,
              private total_wordage: number,
              private followers_count: number,
              private total_likes_count: number,
              private following_count: number) {
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: userInterceptor;
  collections: object;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const param = '595a4f28dd43e92554888e3f';
    this.route.data
      .subscribe((data: {user: userInterceptor}) => {
        console.log(data);
        this.user = data.user;
      });

    console.log(this.route.data)

    /*this.ajax.get('/collections', {userhome: param}).subscribe((data: any) => {
      console.log(data);
      if (data.meta.code === 200) {
        this.collections = data.data;
      }
    });*/
  }
}
