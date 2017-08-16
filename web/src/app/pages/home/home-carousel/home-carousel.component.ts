import {Component, OnInit, ElementRef, Renderer2} from '@angular/core';

const img_arr = [
  {
    id: 0,
    target: true,
    url: 'http://www.jianshu.com/p/467f462ad167?utm_medium=index-banner&utm_source=desktop',
    src: '//upload.jianshu.io/admin_banners/web_images/3224/5679b53ed1b663b80d2e1ea13ef0ce34de59f1dd.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
  },
  {
    id: 1,
    target: true,
    url: 'http://www.jianshu.com/p/467f462ad167?utm_medium=index-banner&utm_source=desktop',
    src: '//upload.jianshu.io/admin_banners/web_images/3225/f50fdbbf377afc97229f991566edee7cafcc31c1.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
  },
  {
    id: 2,
    target: true,
    url: 'http://www.jianshu.com/p/467f462ad167?utm_medium=index-banner&utm_source=desktop',
    src: '//upload.jianshu.io/admin_banners/web_images/3226/261fce0c0f6f5e5adcdf51ff7c8edbaf1ab81e7a.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
  },
  {
    id: 3,
    target: true,
    url: 'http://www.jianshu.com/p/467f462ad167?utm_medium=index-banner&utm_source=desktop',
    src: '//upload.jianshu.io/admin_banners/web_images/3227/546b339181de6e4abb069078686ec35bf129b23b.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
  },
  {
    id: 4,
    target: true,
    url: 'http://www.jianshu.com/p/467f462ad167?utm_medium=index-banner&utm_source=desktop',
    src: '//upload.jianshu.io/admin_banners/web_images/3228/01ff50d9685e41ae9e46f0f8d9ae56bf35d7a055.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
  },
  {
    id: 5,
    target: true,
    url: 'http://www.jianshu.com/p/467f462ad167?utm_medium=index-banner&utm_source=desktop',
    src: '//upload.jianshu.io/admin_banners/web_images/3208/203bee37687b9fa7b46b52e8c4761c1ed0a298f7.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540'
  }
];


@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.css']
})
export class HomeCarouselComponent implements OnInit {
  private left_button: object;
  private right_button: object;
  private primary_banner: object;
  private rear_button: object;
  private list: Array<any>;
  public primary: Array<any>;

  constructor(private element: ElementRef, private renderer2: Renderer2) {
  }

  ngOnInit() {
    this.list = img_arr;
    const _this = this;
    let index = 0;
    console.log('app-home-carousel', this.element, this.element.nativeElement, this.getPrimary(0), this.getPrimary(2), this.getPrimary(5));
    this.left_button = this.element.nativeElement.querySelector('.left');
    this.right_button = this.element.nativeElement.querySelector('.right');
    this.primary_banner = this.element.nativeElement.querySelector('.primary');
    this.rear_button = this.element.nativeElement.querySelector('.rear');
    this.renderer2.listen(this.left_button, 'click', function (event: any) {
      console.log('app-home-carousel-left', event);
      _this.renderer2.removeClass(_this.primary_banner, 'active');
      _this.renderer2.addClass(_this.primary_banner, 'prev');
      index--;
      if (index < 0) {
        index = _this.list.length - 1;
      }
      _this.setBanner(index);
    });
    this.renderer2.listen(this.right_button, 'click', function (event: any) {
      console.log('app-home-carousel-right', event);
    });
    this.setBanner(index);
  }

  setBanner(index) {
    this.primary = this.getPrimary(index);
  }

  getPrimary(index) {
    const primary: Array<any> = [];
    if (index === 0) {
      primary.push(this.list[this.list.length - 1]);
    } else {
      primary.push(this.list[index - 1]);
    }
    primary.push(this.list[index]);
    if (index === this.list.length - 1) {
      primary.push(this.list[0]);
    } else {
      primary.push(this.list[index + 1]);
    }
    return primary;
  }
}
