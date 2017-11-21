import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, HostBinding } from '@angular/core';
import { routerTransition } from '@app/core/animations/router.transition';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerTransition]
})
export class LayoutComponent implements OnInit {
  @HostBinding('class.g-layout') _setClass = true;
  constructor() { }

  ngOnInit() {
  }

}
