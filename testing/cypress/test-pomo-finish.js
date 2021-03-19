describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

/* Starter Tests to find elements on page */
describe('Find Finish Elements', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });
  it('Get element finish button', () => {
    cy.get('#finish-button');
  });
  it('Get element close button', () => {
    cy.get('#statistics-close-button');
  });
  it('Get lightbox title', () => {
    cy.get('#statistics-modal-title');
  });
});

describe('Check Initial State of Elements', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });
  it('Check that button labeled Statistics', () => {
    cy.get('#finish-button').then(($el) => {
      expect($el).to.contain('Statistics');
    });
  });
  it('Check that lightbox is half transparent and is not displayed initially', () => {
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
    cy.get('#statistics-modal')
      .should('have.css', 'background-color')
      .and('eq', 'rgba(0, 0, 0, 0.5)');
  });
});

describe('Check The Enabling/Disabling Finish Button', { includeShadowDom: true }, () => {
  it('Check that the button can be disabled', () => {
    cy.window().then((win) => {
      win.pomoFinish.disableFinish();
      cy.get('#finish-button').should('be.disabled');
    });
  });
  it('Check that the button can be enabled', () => {
    cy.window().then((win) => {
      win.pomoFinish.enableFinish();
      cy.get('#finish-button').should('not.be.disabled');
    });
  });
});

describe('Check Custom Event Dispatchment', { includeShadowDom: true }, () => {
  it('Check that statistics button dispatch a custom event', () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('pomo-finish').then(($el) => {
        const eventFunction = () => {
          $el[0].removeEventListener('modalRequest', eventFunction);
          resolve();
        };
        $el[0].addEventListener('modalRequest', eventFunction);

        cy.get('#finish-button').click();
      });
    });

    cy.wrap(eventPromise);
  });
});

describe('Check open/close fires appropriate events', { includeShadowDom: true }, () => {
  it('Opening stats fires appropriate events', () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('pomo-finish').then(($el) => {
        const eventFunction = () => {
          $el[0].removeEventListener('openEvent', eventFunction);
          resolve();
        };
        $el[0].addEventListener('openEvent', eventFunction);

        cy.window().then((win) => {
          win.pomoFinish.showModal(0, 0, 0, 0);
        });
      });
    });
    cy.wrap(eventPromise);
  });

  it('Closing stats fires appropriate events', () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('pomo-finish').then(($el) => {
        const eventFunction = () => {
          $el[0].removeEventListener('closeEvent', eventFunction);
          resolve();
        };
        $el[0].addEventListener('closeEvent', eventFunction);

        cy.get('#statistics-close-button').click();
      });
    });
    cy.wrap(eventPromise);
  });
});

describe('Check Lightbox Closing Options', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
    cy.window().then((win) => {
      win.pomoFinish.showModal(3, 2, 0, 0);
    });
  });
  it('Check that close button closes lightbox', () => {
    cy.get('#statistics-close-button')
      .click()
      .then(() => {
        cy.get('#statistics-modal').should('have.css', 'display', 'none');
      });
  });
  it('Check clicking top of the modal closes lightbox', () => {
    cy.get('#statistics-modal').click('top');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking top right of the modal closes lightbox', () => {
    cy.get('#statistics-modal').click('topRight');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking top left of the modal closes lightbox', () => {
    cy.get('#statistics-modal').click('topLeft');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking bottom of the modal closes lightbox', () => {
    cy.get('#statistics-modal').click('bottom');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking bottom right of the modal closes lightbox', () => {
    cy.get('#statistics-modal').click('bottomRight');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking bottom left of the modal closes lightbox', () => {
    cy.get('#statistics-modal').click('bottomLeft');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking left of the modal closes lightbox', () => {
    cy.get('#statistics-modal').click('left');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });
  it('Check clicking right left of the modal closes lightbox', () => {
    cy.get('#statistics-modal').click('right');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });
});

describe('Check Dark/Light Settings', { includeShadowDom: true }, () => {
  // NOTE: add color tests here
  it('Check that setDark(true) sets dark mode', () => {
    cy.visit('./source/index.html');
    cy.window().then((win) => {
      win.pomoFinish.setDark(true);
    });
    cy.get('#statistics-styles').should(
      'have.attr',
      'href',
      './components/pomo-finish/pomo-finish.css'
    );
  });

  it('Check that setDark(false) sets light mode', () => {
    cy.visit('./source/index.html');
    cy.window().then((win) => {
      win.pomoFinish.setDark(false);
    });
    cy.get('#statistics-styles').should(
      'have.attr',
      'href',
      './components/pomo-finish/pomo-finish-light.css'
    );
  });
});

describe('Lightbox Closing for Accessibility', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
    cy.window().then((win) => {
      win.pomoFinish.showModal(3, 2, 0, 0);
    });
  });

  it('Check that f button closes lightbox', () => {
    cy.window().then((win) => {
      win.pomoFinish.setAccessibility(true);
    });
    cy.get('body').type('f');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });

  it('Checks that f button doesnt close lightbox when Accessibility is off', () => {
    cy.window().then((win) => {
      win.pomoFinish.setAccessibility(false);
    });
    cy.get('body').type('f');
    cy.get('#statistics-modal').should('have.css', 'display', 'block');
  });
});

describe('Opening Stats Page', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });

  it('Opening stats page with f and Accessibility on', () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('pomo-finish').then(($el) => {
        const eventFunction = () => {
          $el[0].removeEventListener('modalRequest', eventFunction);
          resolve();
        };
        $el[0].addEventListener('modalRequest', eventFunction);

        cy.window().then((win) => {
          win.pomoFinish.setAccessibility(true);
        });
        cy.get('body').type('f');
      });
    });

    cy.wrap(eventPromise);
  });

  it('Opening stats page with f and Accessibility off', () => {
    cy.window().then((win) => {
      win.pomoFinish.setAccessibility(false);
    });
    cy.get('body').type('f');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });
});
