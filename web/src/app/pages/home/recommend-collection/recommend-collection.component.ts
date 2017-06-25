import { Component, OnInit } from '@angular/core';
import { RecommendCollection } from './recommend-collection';


const collections: RecommendCollection[] = [
  {
    id: 1,
    name: '短篇小说',
    img: '//upload.jianshu.io/collections/images/11/20100120161805563.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/195/h/195'
  },
  {
    id: 2,
    name: '@IT·互联网',
    img: '//upload.jianshu.io/collections/images/14/6249340_194140034135_2.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/195/h/195'
  },
  {
    id: 3,
    name: '创业',
    img: '//upload.jianshu.io/collections/images/26/android.graphics.Bitmap_34d0eb2.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/195/h/195'
  },
  {
    id: 4,
    name: '诗',
    img: '//upload.jianshu.io/collections/images/38/android.graphics.Bitmap_f3edcb1.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/195/h/195'
  },
  {
    id: 5,
    name: '青春',
    img: '//upload.jianshu.io/collections/images/20/%E5%9B%BE.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/195/h/195'
  },
  {
    id: 6,
    name: '历史',
    img: '//upload.jianshu.io/collections/images/75/22.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/195/h/195'
  },
  {
    id: 7,
    name: '旅行·在路上',
    img: '//upload.jianshu.io/collections/images/13/IMG_3003.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/195/h/195'
  }
];


@Component({
  selector: 'app-recommend-collection',
  templateUrl: './recommend-collection.component.html',
  styleUrls: ['./recommend-collection.component.css']
})
export class RecommendCollectionComponent implements OnInit {
  public collections:Array<any>;
  constructor() {
    this.collections = collections;
  }

  ngOnInit() {
    // console.log(collections);
  }

}
