describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

describe('Testing Settings with Info', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });

  it('Toggling Dark Mode off & Check that css was changed', () => {
    cy.get('#settings-button').click();
    cy.get('#dark-slider').click();
    cy.get('#settings-close-button').click();
    cy.get('#info-styles').should(
      'have.attr',
      'href',
      './components/pomo-info/pomo-info-light.css'
    );
  });

  it('Toggling Dark Mode on & Check that css was changed', () => {
    cy.get('#settings-button').click();
    cy.get('#dark-slider').click();
    cy.get('#dark-slider').click();
    cy.get('#statistics-close-button').click();
    cy.get('#info-styles').should('have.attr', 'href', './components/pomo-info/pomo-info.css');
  });

  it('Opening Settings and Checking that info is not opened', () => {
    cy.get('#settings-button').click();
    cy.get('#info-button').should('be.disabled');
  });
});

describe('Testing Timer with Info', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });

  it('Starting Timer and Checking that info is not opened', () => {
    cy.get('#timer-button').click();
    cy.get('#info-button').should('be.disabled');
  });

  it('Starting Timer and stopping timer and Checking that info is opened', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-button').click();
    cy.get('#info-button').should('not.be.disabled');
    cy.get('#info-button').click();
    cy.get('#info-modal').should('have.css', 'display', 'block');
  });
});

describe('Testing Stats with Info', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });

  it('Toggling Dark Mode on & Check that css was changed', () => {
    cy.get('#finish-button').click();
    cy.get('#info-button').should('be.disabled');
  });

  it('Opening Settings and Checking that info is not opened', () => {
    cy.get('#finish-button').click();
    cy.get('#statistics-close-button').click();
    cy.get('#info-button').should('not.be.disabled');
    cy.get('#info-button').click();
    cy.get('#info-modal').should('have.css', 'display', 'block');
  });
});
