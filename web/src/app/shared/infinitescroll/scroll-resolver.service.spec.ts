import { TestBed, inject } from '@angular/core/testing';

import { ScrollResolverService } from './scroll-resolver.service';

describe('ScrollResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrollResolverService]
    });
  });

  it('should be created', inject([ScrollResolverService], (service: ScrollResolverService) => {
    expect(service).toBeTruthy();
  }));
});
