import { async, TestBed } from '@angular/core/testing';
import { RestClientModule } from './rest-client.module';

describe('RestClientModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RestClientModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(RestClientModule).toBeDefined();
  });
});
