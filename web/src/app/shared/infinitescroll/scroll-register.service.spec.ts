import { TestBed, inject } from '@angular/core/testing';

import { ScrollRegisterService } from './scroll-register.service';

describe('ScrollRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrollRegisterService]
    });
  });

  it('should be created', inject([ScrollRegisterService], (service: ScrollRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
