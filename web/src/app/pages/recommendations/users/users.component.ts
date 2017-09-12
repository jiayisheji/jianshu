import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  collection = new Array(24);
  page = 1;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.search({}).subscribe((data: any) => {
      console.log(data);
    });
  }

  /**
   * 加载更多
   */
  loadMore() {
    this.page = this.page + 1;
    this.getList(this.page);
  }

  getList(page) {
    this.collection = [];
    /*this.isLoading = true;
    this.userService.search({page, limit: 24, order_by}).subscribe((data: any) => {
      this.collection = [...this.collection, ...data.data];
      this.isLoading = false;
      this.notData = data.total === this.collection.length;
    });*/
  }
}
