import { browser, by, element } from 'protractor';

export class RegistrierKassePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('reg-root h1')).getText();
  }
}
