import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommend-users',
  templateUrl: './recommend-users.component.html',
  styleUrls: ['./recommend-users.component.css']
})
export class RecommendUsersComponent implements OnInit {
  count: number;
  total: number;
  list: any = [
    { "_id": 2184842, "slug": "a04c747f25b6", "nickname": "一只土贼", "avatar": "http://upload.jianshu.io/users/upload_avatars/2184842/76f69cc86045", "total_wordage": "7.3K", "total_likes_count": "119", "subscription_id": 2276315 }, { "_id": 576883, "slug": "ddae1fe6d804", "nickname": "what羊小宝", "avatar": "http://upload.jianshu.io/users/upload_avatars/576883/2235ded767b3", "total_wordage": "6.4K", "total_likes_count": "22", "subscription_id": 497440 }, { "_id": 2362098, "slug": "79675eba4264", "nickname": "是是阿九", "avatar": "http://upload.jianshu.io/users/upload_avatars/2362098/d00f3542c6a5.jpg", "total_wordage": "18.7K", "total_likes_count": "152", "subscription_id": 2459524 }, { "_id": 736815, "slug": "5e75480000be", "nickname": "特立独行的猪先生", "avatar": "http://upload.jianshu.io/users/upload_avatars/736815/a2f409e76cb5.jpg", "total_wordage": "335.4K", "total_likes_count": "8.5K", "subscription_id": 664174 }, { "_id": 5022266, "slug": "80cdb0014d53", "nickname": "verpon", "avatar": "http://upload.jianshu.io/users/upload_avatars/5022266/d945af6f-8789-4d10-ac35-654e62bfffb9.jpg", "total_wordage": "1.2K", "total_likes_count": "42", "subscription_id": 5266129 }
  ]
  constructor() { }

  ngOnInit() {
    this.count = 1;
    this.total = 40;
  }
  /**
   * 上一页
   */
  previousHandler(): void {
    if (this.count === 1) {
      this.count = this.total;
    } else {
      this.count--;
    }
  }
  /**
   * 下一页
   */
  nextHandler(): void {
    if (this.count === this.total) {
      this.count = 1;
    } else {
      this.count++;
    }
  }

  /**
   * 添加关注
   * @param item 当前项 
   */
  followHandler(item: any): void {
    console.log(item);
  }
}
