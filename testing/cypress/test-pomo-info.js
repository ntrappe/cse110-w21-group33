describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

/* Tests to check if all elements exists in the shadow DOM */
describe('Find Elements with ID', { includeShadowDom: true }, () => {
  it("Check for element ('Info')", () => {
    cy.get('#info-button').then(($el) => {
      expect($el).to.contain('Info');
    });
  });
  it('Check for close button', () => {
    cy.get('#info-close-button').then(($el) => {
      expect($el).to.exist;
    });
  });
  it('Check for info content', () => {
    cy.get('#info-content').then(($el) => {
      expect($el).to.exist; // at least has a space
    });
  });
});

describe('Check The Initial State of Component pomo-info', { includeShadowDom: true }, () => {
  it('Check that the lightbox is invisible', () => {
    cy.get('#info-modal').should('have.css', 'display', 'none');
  });
  it('Check that the info button is enabled', () => {
    cy.get('#info-button').should('not.be.disabled');
  });
});

describe('Check The Enabling/Disabling Info Button', { includeShadowDom: true }, () => {
  it('Check that the button can be disabled', () => {
    cy.window().then((win) => {
      win.pomoInfo.disableInfo();
      cy.get('#info-button').should('be.disabled');
    });
  });
  it('Check that the button can be enabled', () => {
    cy.window().then((win) => {
      win.pomoInfo.enableInfo();
      cy.get('#info-button').should('not.be.disabled');
    });
  });
});

describe('Check Lightbox Controls', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });

  it('Check that Info button opens lightbox', () => {
    cy.get('#info-button').click();
    cy.get('#info-modal').should('have.css', 'display', 'block');
    cy.get('#info-modal').should('have.css', 'background-color').and('eq', 'rgba(0, 0, 0, 0.5)');
  });

  it('Check that close button closes lightbox', () => {
    cy.get('#info-button').click();
    cy.get('#info-close-button')
      .click()
      .then(() => {
        cy.get('#info-modal').should('have.css', 'display', 'none');
      });
  });
  it('Check clicking top of the modal closes lightbox', () => {
    cy.get('#info-button').click();
    cy.get('#info-modal').click('top');
    cy.get('#info-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking top right of the modal closes lightbox', () => {
    cy.get('#info-button').click();
    cy.get('#info-modal').click('topRight');
    cy.get('#info-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking top left of the modal closes lightbox', () => {
    cy.get('#info-button').click();
    cy.get('#info-modal').click('topLeft');
    cy.get('#info-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking bottom of the modal closes lightbox', () => {
    cy.get('#info-button').click();
    cy.get('#info-modal').click('bottom');
    cy.get('#info-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking bottom right of the modal closes lightbox', () => {
    cy.get('#info-button').click();
    cy.get('#info-modal').click('bottomRight');
    cy.get('#info-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking bottom left of the modal closes lightbox', () => {
    cy.get('#info-button').click();
    cy.get('#info-modal').click('bottomLeft');
    cy.get('#info-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking left of the modal closes lightbox', () => {
    cy.get('#info-button').click();
    cy.get('#info-modal').click('left');
    cy.get('#info-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking right left of the modal closes lightbox', () => {
    cy.get('#info-button').click();
    cy.get('#info-modal').click('right');
    cy.get('#info-modal').should('have.css', 'display', 'none');
  });
});

describe('Check Dark/Light Settings', { includeShadowDom: true }, () => {
  it('Check that setDark(true) sets dark mode', () => {
    cy.visit('./source/index.html');
    cy.window().then((win) => {
      win.pomoInfo.setDark(true);
    });
    cy.get('#info-timer-styles').should('have.attr', 'href', './components/pomo-info-dark.css');
  });

  it('Check that setDark(false) sets light mode', () => {
    cy.visit('./source/index.html');
    cy.window().then((win) => {
      win.pomoInfo.setDark(false);
    });
    cy.get('#info-timer-styles').should('have.attr', 'href', './components/pomo-info-light.css');
  });
});
