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
    cy.get('#settings-button').click();
    cy.get('#dark-slider').click();
    cy.get('#close-button').click();
    cy.get('#statistics-styles').should(
      'have.attr',
      'href',
      './components/pomo-finish/pomo-finish-light.css'
    );
  });

  it('Toggling Dark Mode on & Check that css was changed', () => {
    cy.get('#settings-button').click();
    cy.get('#dark-slider').click();
    cy.get('#dark-slider').click();
    cy.get('#close-button').click();
    cy.get('#statistics-styles').should(
      'have.attr',
      'href',
      './components/pomo-finish/pomo-finish.css'
    );
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

describe('Testing Storage with Stats', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });

  it('Testing a complete cycle', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-button').click();
    cy.get('#settings-button').click();
    cy.get('#work-number').type('{selectall}{backspace}1', { force: true }).trigger('change');
    cy.get('#short-section').type('{selectall}{backspace}1', { force: true }).trigger('change');
    cy.get('#long-section').type('{selectall}{backspace}1', { force: true }).trigger('change');
    cy.get('#close-button').click();
    cy.get('#timer-button').click();
    cy.wait(15500);
    cy.get('#finish-button').click();
    cy.get('#statistics-panel').then(($el) => {
      expect($el).to.contain('Pomodoro Completed: 1');
      expect($el).to.contain('Short Breaks: 0');
      expect($el).to.contain('Long Breaks: 0');
      expect($el).to.contain('Interrupted Session: 1');
    });
    cy.get('#statistics-close-button').click();
    
  });

});
