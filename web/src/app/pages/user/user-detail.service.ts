import {Injectable} from '@angular/core';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {AppHttpProvider} from '../../core/ajax';
import {Observable, Subscribable} from 'rxjs/Observable';
import 'rxjs/add/operator/first'
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

@Injectable()
export class UserDetailResolver implements Resolve<User> {
  constructor(private ajax: AppHttpProvider, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.ajax.get(`/user/${route.params['id']}/home`).map((data: any) => {
      if (data.meta && data.meta.code === 200) {
        return data.data;
      } else {
        this.router.navigate(['/404']);
        return false;
      }
    }).first();
    /*.subscribe((data: any) => {
      if (data.meta && data.meta.code === 200) {
        return data.data;
      } else {
        this.router.navigate(['/404']);
        return false;
      }
    });*/
  }
}
