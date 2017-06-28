import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable"
const articleList: any[] = [
  {
    id: 1,
    images: '//upload-images.jianshu.io/upload_images/239688-4cfc4b7a22512cd9?imageMogr2/auto-orient/strip|imageView2/1/w/375/h/300',
    title: '为什么你总觉得自己有理想，却又不知怎么实现？',
    abstract: '知乎上收到一位朋友的提问，他说：大三抱着一腔热血要创业，机缘巧合做了快餐。 一开始我觉的开一个小店根本不是我的梦想，我要把他做成连锁店，做到一线城市。 三年过去了还是那么小的...',
    author: {
      id: 1,
      nickname: '小川叔',
      time: '2017-05-22T09:47:17+08:00',
      avatar: '//upload.jianshu.io/users/upload_avatars/239688/1fb27128-91e8-4796-beb1-5fd92c2fcdf9.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96'
    },
    meta: {
      collectionTag: '职场江湖',
      read: 258,
      comments: 1,
      like: 100
    }
  },
  {
    id: 2,
    title: '父母的这些套路，你到底懂不懂',
    abstract: '《请回答1988》里，大女儿宝拉给爸爸买了件衬衫，死活不好意思送出去，只能让妈妈转交。爸爸穿着紧绷的衣服，一个劲儿地说合适。 大结局，情节再次呼应。 这一次，爸爸穿着宝拉买的...',
    author: {
      id: 1,
      nickname: '槽值',
      time: '2017-05-21T17:40:13+08:00',
      avatar: '//upload.jianshu.io/users/upload_avatars/6126137/e83c6b36-be36-4308-8ff4-41c32fc26705?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96'
    },
    meta: {
      collectionTag: '世间事',
      read: 258,
      comments: 1,
      like: 100
    }
  }
];
@Injectable()
export class ArticleListService {

  constructor() { }

  get(request:string): Observable<any>{
    return Observable.create((observer) => {
      setTimeout(() => {
        observer.next(articleList);
      }, 1000);
    });

  }

}
