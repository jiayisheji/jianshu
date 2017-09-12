import {Component, OnInit} from '@angular/core';
import {Route, Router, ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import {CollectionsService} from '../collections/collections.service';
import {AuthorizationService} from '../../core/authorization/authorization.service';

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

interface InterfaceUserHomecollections {
  data: Array<any>;
  page: number;
  isMore: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [CollectionsService]
})
export class UserComponent implements OnInit {
  user: userInterceptor;
  collections: object;
  owner_collections = [];
  isMyHome: boolean = false;
  manager_collections: Object = {};
  books: Array<any> = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authorizationService: AuthorizationService,
              private userService: UserService,
              private collectionsService: CollectionsService) {
  }

  ngOnInit() {

    this.route.data
      .subscribe((data: { user: userInterceptor }) => {
        console.log(data);
        this.user = data.user;
      });

    if (this.authorizationService.isLogin()) {
      this.isMyHome = this.authorizationService.getCurrentUser().user.slug === this.user.slug;
    }
    this.userService.collectionsAndBooks(this.user.slug).subscribe((user: any) => {
      console.log(user.data);
      this.loadOwnerData({
        data: user.data.owner_collections,
        total: user.data.owner_collections_total,
        page: user.data.owner_collections_page
      });
    });

    console.log(this.route.data)

    /*this.ajax.get('/collections', {userhome: param}).subscribe((data: any) => {
      console.log(data);
      if (data.meta.code === 200) {
        this.collections = data.data;
      }
    });*/
  }

  loadOwnerData(data) {
    this.owner_collections = [...this.owner_collections, ...data.data];
    /*this.owner_collection.page = data.page;
    this.owner_collection.isMore = this.owner_collection.data.length < data.total;*/
    console.log(this.owner_collections)
  }

  loadManagerData(data) {

  }

  loadMoreCollections(type: string, page: number) {
    this.collectionsService.search({
      type,
      page,
      limit: 10,
      slug: this.user.slug
    }).subscribe((results: any) => {
      if (type === 'owner') {
        this.loadOwnerData(results);
      } else if (type === 'manager') {
        this.loadManagerData(results);
      }
    });
  }
}
