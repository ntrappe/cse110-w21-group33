describe('Open Page', () => {
    it('Opens index.html', () => {
      cy.visit('./source/index.html');
    });
  });
  
describe('Testing Settings with Finish', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });

  it('Toggling Dark Mode off & Check that css was changed', () => {
    cy.get('#settings-button').click()
    cy.get('#dark-slider').click();
    cy.get('#close-button').click();
    cy.get('#statistics-styles').should('have.attr', 'href', './components/pomo-finish/pomo-finish-light.css');
  });

  it('Toggling Dark Mode on & Check that css was changed', () => {
    cy.get('#settings-button').click();
    cy.get('#dark-slider').click();
    cy.get('#dark-slider').click();
    cy.get('#close-button').click();
    cy.get('#statistics-styles').should('have.attr', 'href', './components/pomo-finish/pomo-finish.css');
  });

  it('Opening Settings and Checking that finish is not opened', () => {
    cy.get('#settings-button').click();
    cy.get('#finish-button').should('be.disabled');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });
});

describe('Testing Timer with Info', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });

  it('Starting Timer and Stats that info is not opened', () => {
    cy.get('#timer-button').click();
    cy.get('#finish-button').should('be.disabled');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });

  it('Starting Timer and stopping timer and Checking that info is opened', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-button').click();
    cy.get('#finish-button').should('not.be.disabled');
    cy.get('#finish-button').click();
    cy.get('#statistics-modal').should('have.css', 'display', 'block');
  });
});

describe('Testing Info with Stats', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });
  
  it('Toggling Dark Mode on & Check that css was changed', () => {
    cy.get('#info-button').click();
    cy.get('#finish-button').should('be.disabled');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });

  it('Opening Info and Checking that stats is not opened', () => {
    cy.get('#info-button').click();
    cy.get('#info-close-button').click();
    cy.get('#finish-button').should('not.be.disabled');
    cy.get('#finish-button').click();
    cy.get('#statistics-modal').should('have.css', 'display', 'block');
  });
});