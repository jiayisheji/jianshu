import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarouselComponent } from './home-carousel.component';

describe('HomeCarouselComponent', () => {
  let component: HomeCarouselComponent;
  let fixture: ComponentFixture<HomeCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
