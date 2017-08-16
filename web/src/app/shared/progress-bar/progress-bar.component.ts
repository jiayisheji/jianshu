import {Component, ChangeDetectionStrategy, Input, HostBinding} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  @HostBinding('attr.role') role = 'progressbar';
  @HostBinding('attr.aria-valuemin') ariavaluemin = '0';
  @HostBinding('attr.aria-valuemax') ariaValuemax = '100';
  @HostBinding('attr.aria-valuenow') ariaValuenow = 'value';
  @HostBinding('class.primary') primary = 'color == "primary"';
  @HostBinding('class.accent') accent = 'color == "accent"';
  @HostBinding('class.warn') warn = 'color == "warn"';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  @Input()
  get value() {
    return this._value;
  }

  set value(v: number) {
    this._value = clamp(v || 0);
  }

  private _value = 0;
  private _bufferValue = 0;

  /** Buffer value of the progress bar. Defaults to zero. */
  @Input()
  get bufferValue() {
    return this._bufferValue;
  }

  set bufferValue(v: number) {
    this._bufferValue = clamp(v || 0);
  }

  /**
   * Mode of the progress bar.
   *
   * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
   * 'determinate'.
   * Mirrored to mode attribute.
   */
  @Input() mode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'determinate';

  /** Gets the current transform value for the progress bar's primary indicator. */
  _primaryTransform() {
    const scale = this.value / 100;
    return {transform: `scaleX(${scale})`};
  }

  /**
   * Gets the current transform value for the progress bar's buffer indicator.  Only used if the
   * progress mode is set to buffer, otherwise returns an undefined, causing no transformation.
   */
  _bufferTransform() {
    if (this.mode === 'buffer') {
      const scale = this.bufferValue / 100;
      return {transform: `scaleX(${scale})`};
    }
  }

}

/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}
