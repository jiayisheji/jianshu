import {Component, OnInit} from '@angular/core';
import {CollectionsService} from '../../collections/collections.service';



@Component({
  selector: 'app-recommend-collection',
  templateUrl: './recommend-collection.component.html',
  styleUrls: ['./recommend-collection.component.css'],
  providers: [CollectionsService]
})
export class RecommendCollectionComponent implements OnInit {
  public collections = [];

  constructor(private collectionsService: CollectionsService) {
  }

  ngOnInit() {
    this.collectionsService.search({page: 1, limit: 6}).subscribe((data: any) => {
      this.collections = data.data;
    });
  }

}
