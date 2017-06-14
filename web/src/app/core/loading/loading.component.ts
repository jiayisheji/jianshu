import { Component, ChangeDetectionStrategy, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.html',
  styles: [
    `
.loading{
  margin: 80px auto;
  position: absolute;
  left: 45%;
  top: 45%;
  width: 5rem;
  height: 5rem;
  z-index: 999;
}
@-webkit-keyframes bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
}
@-moz-keyframes bouncedelay {
    0%, 80%, 100% { -moz-transform: scale(0.0) }
    40% { -moz-transform: scale(1.0) }
}
@-o-keyframes bouncedelay {
    0%, 80%, 100% { -o-transform: scale(0.0) }
    40% { -o-transform: scale(1.0) }
}
@keyframes bouncedelay {
    0%, 80%, 100% {
        transform: scale(0.0);
    } 40% {
          transform: scale(1.0);
      }
}
.loading .circle {
    width: 100%;
    height: 100%;
    position: relative;
}

.loading .container1 > div,.loading .container2 > div,.loading .container3 > div {
    width: 20%;
    height: 20%;
    background-color:#67CF22;
    border-radius: 50%;
    position: absolute;
    -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
    -moz-animation: bouncedelay 1.2s infinite ease-in-out;
    -o-animation: bouncedelay 1.2s infinite ease-in-out;
    animation: bouncedelay 1.2s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    -moz-animation-fill-mode: both;
    -o-animation-fill-mode: both;
    animation-fill-mode: both;
}

.loading .spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
}

.loading .container2 {
    -webkit-transform: rotateZ(45deg);
    -moz-transform: rotateZ(45deg);
    -o-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
}

.loading .container3 {
    -webkit-transform: rotateZ(90deg);
    -moz-transform: rotateZ(90deg);
    -o-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
}

.loading .circle1 { top: 0; left: 0; }
.loading .circle2 { top: 0; right: 0; }
.loading .circle3 { right: 0; bottom: 0; }
.loading .circle4 { left: 0; bottom: 0; }

.loading .container2 .circle1 {
    -webkit-animation-delay: -1.1s;
    -moz-animation-delay: -1.1s;
    -o-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.loading .container3 .circle1 {
    -webkit-animation-delay: -1.0s;
    -moz-animation-delay: -1.0s;
    -o-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.loading .container1 .circle2 {
    -webkit-animation-delay: -0.9s;
    -moz-animation-delay: -0.9s;
    -o-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.loading .container2 .circle2 {
    -webkit-animation-delay: -0.8s;
    -moz-animation-delay: -0.8s;
    -o-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

.loading .container3 .circle2 {
    -webkit-animation-delay: -0.7s;
    -moz-animation-delay: -0.7s;
    -o-animation-delay: -0.7s;
    animation-delay: -0.7s;
}

.loading .container1 .circle3 {
    -webkit-animation-delay: -0.6s;
    -moz-animation-delay: -0.6s;
    -o-animation-delay: -0.6s;
    animation-delay: -0.6s;
}

.loading .container2 .circle3 {
    -webkit-animation-delay: -0.5s;
    -moz-animation-delay: -0.5s;
    -o-animation-delay: -0.5s;
    animation-delay: -0.5s;
}

.loading .container3 .circle3 {
    -webkit-animation-delay: -0.4s;
    -moz-animation-delay: -0.4s;
    -o-animation-delay: -0.4s;
    animation-delay: -0.4s;
}

.loading .container1 .circle4 {
    -webkit-animation-delay: -0.3s;
    -moz-animation-delay: -0.3s;
    -o-animation-delay: -0.3s;
    animation-delay: -0.3s;
}

.loading .container2 .circle4 {
    -webkit-animation-delay: -0.2s;
    -moz-animation-delay: -0.2s;
    -o-animation-delay: -0.2s;
    animation-delay: -0.2s;
}

.loading .container3 .circle4 {
    -webkit-animation-delay: -0.1s;
    -moz-animation-delay: -0.1s;
    -o-animation-delay: -0.1s;
    animation-delay: -0.1s;
}
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {

  constructor(private elmRef: ElementRef, private renderer: Renderer) {

  }

  show(): void {
    this.updateStatus(false);
  }

  hide(): void {
    this.updateStatus(true);
  }

  private updateStatus(add: boolean) {
    this.renderer.setElementClass(this.elmRef.nativeElement, 'hidden', add);
  }
}