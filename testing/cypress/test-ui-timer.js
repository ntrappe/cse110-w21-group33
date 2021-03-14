describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

describe('Verify setDark colors for pomoTimer', { includeShadowDom: true }, () => {
  it('Check if pomoTimer exists', () => {
    cy.window().then((win) => {
      expect(win.pomoTimer).to.exist;
    });
  });

  it('Check setDark colors for initial progress/timer backgrounds', () => {
    cy.window().then((win) => {
      win.pomoTimer.setDark(true);

      /* Verify background colors */
      cy.get('.space').should('have.css', 'background-color', 'rgb(14, 17, 22)');
      cy.get('.time').should('have.css', 'background-color', 'rgb(23, 27, 33)');
      cy.get('.square-off').should('have.css', 'color', 'rgb(23, 27, 33)');
    });
  });

  it('Check setDark colors for lit progress squares', () => {
    cy.window().then((win) => {
      win.pomoTimer.setDark(true);
      win.pomoTimer.setProgress(4);

      cy.get('.square-on').should('have.css', 'color', 'rgb(66, 144, 70)');
      cy.get('#square4').should('have.css', 'color', 'rgb(103, 199, 92)');
    });
  });

  it('Check setDark for work mode', () => {
    cy.window().then((win) => {
      win.pomoTimer.setDark(true);

      win.pomoTimer.setTimer(1, 'work');
      cy.get('#timer-mode').should('have.css', 'background-color', 'rgb(24, 34, 29)');
      cy.get('#timer-mode').should('have.css', 'color', 'rgb(121, 208, 113)');
    });
  });

  it('Check setDark for short break mode', () => {
    cy.window().then((win) => {
      win.pomoTimer.setDark(true);

      win.pomoTimer.setTimer(1, 'short');
      cy.get('#timer-mode').should('have.css', 'background-color', 'rgb(24, 10, 50)');
      cy.get('#timer-mode').should('have.css', 'color', 'rgb(144, 102, 255)');
    });
  });

  it('Check setDark for long break mode', () => {
    cy.window().then((win) => {
      win.pomoTimer.setDark(true);

      win.pomoTimer.setTimer(1, 'long');
      cy.get('#timer-mode').should('have.css', 'background-color', 'rgb(12, 34, 55)');
      cy.get('#timer-mode').should('have.css', 'color', 'rgb(59, 169, 255)');
    });
  });
});

describe('Test setCalm on pomoTimer', { includeShadowDom: true }, () => {
  it('Check if pomoTimer exists', () => {
    cy.window().then((win) => {
      expect(win.pomoTimer).to.exist;
    });
  });

  it('Check timer text in calm mode', () => {
    cy.window().then((win) => {
      win.pomoTimer.setTimer(1, 'work');
      win.pomoTimer.setCalm(true);

      cy.get('#timer-text').then(($text) => {
        expect($text).to.contain('1m');
        expect($text).to.not.contain(':');
      });
    });
  });
});

describe('Test Timer Button UI', { includeShadowDom: true }, () => {
  it('Check initial button colors', () => {
    cy.get('#timer-button').should('have.css', 'background-color', 'rgb(34, 38, 44)');
    cy.get('#timer-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');
  });
});
