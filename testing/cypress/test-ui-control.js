import { testUITimerDark, testUITimerLight, testUITimerCalm } from './test-ui-timer';
import { testUISettingsDark, testUISettingsLight } from './test-ui-settings';
import { testUIInfoDark, testUIInfoLight } from './test-ui-info';
import { testUIFinishDark, testUIFinishLight } from './test-ui-finish';

describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

describe('Check control setDark', { includeShadowDom: true }, () => {
  it('Check page background color', () => {
    cy.get('#body').should('have.css', 'background-color', 'rgb(14, 17, 22)');
  });

  testUISettingsDark();
  testUIInfoDark();
  testUIFinishDark();
  testUITimerDark();
});

describe('Check control set light mode', { includeShadowDom: true }, () => {
  it('Toggle light mode', () => {
    cy.get('#settings-button').click();
    cy.get('#dark-slider').click();
    cy.get('#settings-close-button').click();
  });

  it('Check page background color', () => {
    cy.get('#body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
  });

  testUISettingsLight(true);
  testUIInfoLight(true);
  testUIFinishLight(true);
  testUITimerLight(true);
});

describe('Check control set calm mode', { includeShadowDom: true }, () => {
  testUITimerCalm();
});
