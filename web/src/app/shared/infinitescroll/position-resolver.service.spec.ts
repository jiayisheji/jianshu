import { TestBed, inject } from '@angular/core/testing';

import { PositionResolverService } from './position-resolver.service';

describe('PositionResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PositionResolverService]
    });
  });

  it('should be created', inject([PositionResolverService], (service: PositionResolverService) => {
    expect(service).toBeTruthy();
  }));
});
