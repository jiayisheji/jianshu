import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadingComplete = false;
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError)
      .subscribe((result) => this.loadingComplete = true);
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((result) => this.loadingComplete = false);
  }
}
