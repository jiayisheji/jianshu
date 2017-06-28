import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface menuInterface{
  icon: string;
  label: string;
  component: string;
  request: string;
  active: boolean;
}

const menu = [
  {
    icon: "icon-articles",
    label: "文章",
    component: "app-article-list",
    request: "?order_by=shared_at"
  },
  {
    icon: "icon-feed",
    label: "动态",
    request: "/timeline"
  },
  {
    icon: "icon-latestcomments",
    label: "最新评论",
    component: "app-article-list",
    request: "?order_by=commented_at"
  },
  {
    icon: "icon-hot",
    label: "热门",
    component: "app-article-list",
    request: "?order_by=top"
  }
];

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public menu:Array<menuInterface> = [];
  public container: object = {};
  constructor(private route : ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.menu = menu.map((item: menuInterface) => {
      item.active = false;
      item.request = `/user/${this.route.snapshot.params.id}${item.request}`;
      return item;
    });
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
