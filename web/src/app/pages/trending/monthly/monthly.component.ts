import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css']
})
export class MonthlyComponent implements OnInit {
  request= '/';
  constructor() { }

  ngOnInit() {
  }

}
