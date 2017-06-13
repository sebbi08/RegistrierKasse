import { RegistrierKassePage } from './app.po';

describe('registrier-kasse App', () => {
  let page: RegistrierKassePage;

  beforeEach(() => {
    page = new RegistrierKassePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to reg!!');
  });
});
