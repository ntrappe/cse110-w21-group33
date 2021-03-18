/* Test for accessibility on/off in control */

describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

// Used for calling functions on the component
describe('Test when accessibility is off', { includeShadowDom: true }, () => {
  let accessTriggered = false;
  beforeEach(() => {
    cy.visit('./source/index.html');
    cy.window().then((win) => {
      win.addEventListener('accessSet', () => {
        accessTriggered = true;
      });
    });
    cy.get('#settings-button').click();
    cy.get('#accessible-slider').click();
    cy.get('#settings-close-button').click();
  });

  it('settings gets correct input', () => {
    cy.window().then((win) => {
      expect(win.pomoSettings.accessible).to.eq(false);
    });
  });

  it('control gets correct signal', () => {
    cy.wrap().should(() => {
      expect(accessTriggered).to.eq(true);
    });
  });

  it('every elemets gets correct signal', () => {
    cy.window().then((win) => {
      expect(win.pomoTimer.accessible).to.equal(false);
      expect(win.pomoInfo.accessible).to.equal(false);
      expect(win.pomoSettings.accessible).to.equal(false);
      expect(win.pomoFinish.accessible).to.equal(false);
    });
  });

  it('storage get the correct signal', () => {
    expect(localStorage.getItem('isAccessible')).to.equal('false');
  });

  /* Cannot listen to events not called, so I button properties */
  it('cannot start timer with keyboard', () => {
    cy.get('body').type('s', { force: true });
    cy.get('#timer-button').should('have.prop', 'innerHTML', 'Start');
    cy.get('#timer-button').should('have.prop', 'textContent', 'Start');
  });

  it('cannot end timer with keyboard', () => {
    cy.get('#timer-button').click();
    cy.get('body').type('r', { force: true });
    cy.get('#timer-button').should('have.prop', 'innerHTML', 'Reset');
    cy.get('#timer-button').should('have.prop', 'textContent', 'Reset');

  });

  it('cannot open info with keyboard', () => {
    cy.get('body').type('i', { force: true });
    cy.get('#info-modal').should('have.css', 'display', 'none');
  });

  it('cannot close info with keyboard', () => {
    cy.get('#info-button').click();
    cy.get('body').type('i', { force: true });
    cy.get('#info-modal').should('have.css', 'display', 'block');
  });

  it('cannot open stat with keyboard', () => {
    cy.get('body').type('f', { force: true });
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });

  it('cannot close stat with keyboard', () => {
    cy.get('#finish-button').click();
    cy.get('body').type('f', { force: true });
    cy.get('#statistics-modal').should('have.css', 'display', 'block');
  });

  it('cannot open setting with keyboard', () => {
    cy.get('body').type('q', { force: true });
    cy.get('#settings-modal').should('have.css', 'display', 'none');
  });

  it('cannot close setting with keyboard', () => {
    cy.get('#settings-button').click();
    cy.get('body').type('q', { force: true });
    cy.get('#settings-modal').should('have.css', 'display', 'block');
  });
});

// Used for calling functions on the component
describe('Test when accessibility is on', { includeShadowDom: true }, () => {
  let accessTriggered = false;
  beforeEach(() => {
    cy.reload();
    cy.window().then((win) => {
      win.addEventListener('accessSet', () => {
        accessTriggered = true;
      });
    });
    cy.get('#settings-button').click();
    cy.get('#accessible-slider').click();
    cy.get('#accessible-slider').click();
    cy.get('#settings-close-button').click();
  });

  it('settings gets correct input', () => {
    cy.window().then((win) => {
      expect(win.pomoSettings.accessible).to.eq(true);
    });
  });

  it('control gets correct signal', () => {
    cy.wrap().should(() => {
      expect(accessTriggered).to.eq(true);
    });
  });

  it('every elemets gets correct signal', () => {
    cy.window().then((win) => {
      expect(win.pomoTimer.accessible).to.equal(true);
      expect(win.pomoInfo.accessible).to.equal(true);
      expect(win.pomoSettings.accessible).to.equal(true);
      expect(win.pomoFinish.accessible).to.equal(true);
    });
  });

  it('storage get the correct signal', () => {
    expect(localStorage.getItem('isAccessible')).to.equal('true');
  });

  /* Cannot listen to events not called, so I button properties */
  it('can start timer with keyboard', () => {
    cy.get('body').type('s', { force: true });
    cy.get('#timer-button').should('have.prop', 'innerHTML', 'Reset');
    cy.get('#timer-button').should('have.prop', 'textContent', 'Reset');
  });

  it('can end timer with keyboard', () => {
    cy.get('#timer-button').click();
    cy.get('body').type('r', { force: true });
    cy.get('#timer-button').should('have.prop', 'innerHTML', 'Start');
    cy.get('#timer-button').should('have.prop', 'textContent', 'Start');

  });

  it('can open info with keyboard', () => {
    cy.get('body').type('i', { force: true });
    cy.get('#info-modal').should('have.css', 'display', 'block');
  });

  it('can close info with keyboard', () => {
    cy.get('#info-button').click();
    cy.get('body').type('i', { force: true });
    cy.get('#info-modal').should('have.css', 'display', 'none');
  });

  it('can open stat with keyboard', () => {
    cy.get('body').type('f', { force: true });
    cy.get('#statistics-modal').should('have.css', 'display', 'block');
  });

  it('can close stat with keyboard', () => {
    cy.get('#finish-button').click();
    cy.get('body').type('f', { force: true });
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });

  it('can open setting with keyboard', () => {
    cy.get('body').type('q', { force: true });
    cy.get('#settings-modal').should('have.css', 'display', 'block');
  });

  it('can close setting with keyboard', () => {
    cy.get('#settings-button').click();
    cy.get('body').type('q', { force: true });
    cy.get('#settings-modal').should('have.css', 'display', 'none');
  });
});
