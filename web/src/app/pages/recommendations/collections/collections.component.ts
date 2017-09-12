import {Component, OnInit} from '@angular/core';
import {CollectionsService} from '../../collections/collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
  providers: [CollectionsService]
})
export class CollectionsComponent implements OnInit {
  collection = [];
  page = 1;
  order_by = 'recommend';
  isLoading = false;
  notData = false;

  constructor(private collectionsService: CollectionsService) {
  }

  ngOnInit() {
    this.getList(this.page, this.order_by);
  }

  /**
   * 加载更多
   */
  loadMore() {
    this.page = this.page + 1;
    this.getList(this.page, this.order_by);
  }

  /**
   * 关注
   * @param item
   */
  subscribers(item) {
    this.collectionsService.subscribe(item.slug).subscribe((data: any) => {
      console.log(data);
    });
  }
  getList(page, order_by) {
    this.isLoading = true;
    this.collectionsService.search({page, limit: 24, order_by}).subscribe((data: any) => {
      this.collection = [...this.collection, ...data.data];
      this.isLoading = false;
      this.notData = data.total === this.collection.length;
    });
  }
}
