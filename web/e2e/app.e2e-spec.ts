import { WebPage } from './app.po';

describe('web App', () => {
  let page: WebPage;

  beforeEach(() => {
    page = new WebPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
