import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
interface menuInterface{
  icon: string;
  label: string;
  component?: string;
  request: string;
  active: boolean;
}

const menu = [
  {
    icon: "icon-latestcomments",
    label: "最新评论",
    request: "?order_by=commented_at"
  },
  {
    icon: "icon-articles",
    label: "最新收录",
    request: "?order_by=added_at"
  },
  {
    icon: "icon-hot",
    label: "热门",
    request: "?order_by=top"
  }
];
@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  public menu:Array<menuInterface> = [];
  public container: object = {};
  private collections: object = {};
  constructor(private route : ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.menu = menu.map((item: menuInterface) => {
      item.active = false;
      item.request = `/collections/${this.route.snapshot.params.id}${item.request}`;
      return item;
    });
    this.collections = {
      slug: 1,
      title: "旅行·在路上",
      follows_count: 936727,
      articles_count: 64346,
      editor: [
        {
          slug: 1,
          nickname: "jiayi",
          avatar: "//upload.jianshu.io/users/upload_avatars/3244892/79f7d429-022c-4f5b-bea8-859e3af593f4.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/144/h/144"
        },
        {
          slug: 2,
          nickname: "呵呵",
          avatar: "//upload.jianshu.io/users/upload_avatars/3244892/79f7d429-022c-4f5b-bea8-859e3af593f4.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/144/h/144"
        },
        {
          slug: 3,
          nickname: "hehe",
          avatar: "//upload.jianshu.io/users/upload_avatars/3244892/79f7d429-022c-4f5b-bea8-859e3af593f4.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/144/h/144"
        }
      ]
    }
    this.init(0);
  }
  private init(index:number){
    let items = this.menu[index];
    items.active = true;
    this.container = {
      request: items.request,
      component: items.component
    }
  }
  setMenu(items: menuInterface){
    this.menu.forEach((item: menuInterface) => {
      item.active = false;
    });
    items.active = true;
    this.container = {
      request: items.request,
      component: items.component
    }
  }
}
