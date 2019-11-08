import { RestClient } from './rest-client.decorator';

describe('RestClient', () => {
  it('should create an instance', () => {
    expect(new RestClient()).toBeTruthy();
  });
});
