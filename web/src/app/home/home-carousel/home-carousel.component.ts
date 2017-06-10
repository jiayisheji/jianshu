import { Component, OnInit , ElementRef} from '@angular/core';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {

  constructor(private element: ElementRef) { }

  ngOnInit() {
    console.log('app-home-carousel', this.element);
  }

}
