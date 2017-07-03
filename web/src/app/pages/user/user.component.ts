import {Component, OnInit} from '@angular/core';
import {AppHttpProvider} from '../../core/ajax';
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


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: userInterceptor;
  collections: object;
  constructor(private ajax: AppHttpProvider) {
  }

  ngOnInit() {
    const param = '595a4f28dd43e92554888e3f';
    this.ajax.get(`/user/${param}/home`).subscribe((data: any) => {
      console.log(data);
      if (data.meta.code === 200) {
        this.user = data.data;
      }
    });
    this.ajax.get('/collections', {userhome: param}).subscribe((data: any) => {
      console.log(data);
      if (data.meta.code === 200) {
        this.collections = data.data;
      }
    });
  }
}
