import { WINDOW } from './window.token';

import { TestBed, inject } from '@angular/core/testing';

describe('Service token: WINDOW', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
    });
  });
  it('should service work', inject([WINDOW], (window: Window) => {
    expect(window).toBeTruthy();
  }));
});
