import { getGreeting } from '../support/app.po';

describe('secure', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to secure!');
  });
});
