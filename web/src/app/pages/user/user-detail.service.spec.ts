import { TestBed, inject } from '@angular/core/testing';

import { UserDetailService } from './user-detail.service';

describe('UserDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDetailService]
    });
  });

  it('should be created', inject([UserDetailService], (service: UserDetailService) => {
    expect(service).toBeTruthy();
  }));
});
