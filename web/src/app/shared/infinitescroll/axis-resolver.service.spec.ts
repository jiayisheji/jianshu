import { TestBed, inject } from '@angular/core/testing';

import { AxisResolverService } from './axis-resolver.service';

describe('AxisResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AxisResolverService]
    });
  });

  it('should be created', inject([AxisResolverService], (service: AxisResolverService) => {
    expect(service).toBeTruthy();
  }));
});
