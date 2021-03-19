describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

function testUITimerDark() {
  describe('Verify dark mode colors for pomoTimer', { includeShadowDom: true }, () => {
    it('Check if pomoTimer exists', () => {
      cy.window().then((win) => {
        expect(win.pomoTimer).to.exist;
      });
    });

    it('Check dark mode colors for initial colors', () => {
      /* Verify border/background colors */
      cy.get('.space').should('have.css', 'background-color', 'rgb(14, 17, 22)');
      cy.get('.square-off').should('have.css', 'background-color', 'rgb(23, 27, 33)');
      cy.get('.square-off').should('have.css', 'border-color', 'rgb(23, 27, 33)');
      cy.get('.square-off').should('have.css', 'color', 'rgb(23, 27, 33)');
      cy.get('#timer-text').should('have.css', 'background-color', 'rgb(23, 27, 33)');
      cy.get('#timer-text').should('have.css', 'border-color', 'rgb(49, 54, 60)');
      cy.get('#timer-text').should('have.css', 'color', 'rgb(162, 170, 181)');
      cy.get('#timer-button').should('have.css', 'background-color', 'rgb(34, 38, 44)');
      cy.get('#timer-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');
      cy.get('#timer-button').should('have.css', 'color', 'rgb(203, 209, 216)');
    });

    it('Check dark mode colors for lit progress squares', () => {
      cy.window().then((win) => {
        win.pomoTimer.setProgress(4);

        /* Check lit progress square color, last square has a different color */
        cy.get('.square-on').should('have.css', 'background-color', 'rgb(66, 144, 70)');
        cy.get('.square-on').should('have.css', 'border-color', 'rgb(85, 167, 88)');
        cy.get('.square-on').should('have.css', 'color', 'rgb(66, 144, 70)');
        cy.get('#square4').should('have.css', 'background-color', 'rgb(103, 199, 92)');
        cy.get('#square4').should('have.css', 'border-color', 'rgb(140, 233, 107)');
        cy.get('#square4').should('have.css', 'color', 'rgb(103, 199, 92)');
      });
    });

    it('Check dark mode colors for work mode', () => {
      cy.window().then((win) => {
        win.pomoTimer.setTimer(1, 'work');
        cy.get('#timer-mode').should('have.css', 'background-color', 'rgb(24, 34, 29)');
        cy.get('#timer-mode').should('have.css', 'border-color', 'rgb(53, 94, 54)');
        cy.get('#timer-mode').should('have.css', 'color', 'rgb(121, 208, 113)');
      });
    });

    it('Check dark mode colors for short break mode', () => {
      cy.window().then((win) => {
        win.pomoTimer.setTimer(1, 'short');
        cy.get('#timer-mode').should('have.css', 'background-color', 'rgb(24, 10, 50)');
        cy.get('#timer-mode').should('have.css', 'border-color', 'rgb(87, 36, 153)');
        cy.get('#timer-mode').should('have.css', 'color', 'rgb(144, 102, 255)');
      });
    });

    it('Check dark mode colors for long break mode', () => {
      cy.window().then((win) => {
        win.pomoTimer.setTimer(1, 'long');
        cy.get('#timer-mode').should('have.css', 'background-color', 'rgb(12, 34, 55)');
        cy.get('#timer-mode').should('have.css', 'border-color', 'rgb(26, 75, 115)');
        cy.get('#timer-mode').should('have.css', 'color', 'rgb(59, 169, 255)');
      });
    });
  });
}

function testUITimerLight(fromControl) {
  describe('Verify light mode colors for pomoTimer', { includeShadowDom: true }, () => {
    it('Check if pomoTimer exists', () => {
      cy.window().then((win) => {
        expect(win.pomoTimer).to.exist;
      });
    });

    if (!fromControl) {
      it('Toggle light mode', () => {
        cy.get('#settings-button').click();
        cy.get('#dark-slider').click();
        cy.get('#settings-close-button').click();
      });
    }

    it('Check light mode colors for initial colors', () => {
      /* Verify border/background colors */
      cy.get('.space').should('have.css', 'background-color', 'rgb(255, 255, 255)');
      cy.get('.square-on').should('have.css', 'background-color', 'rgb(36, 207, 83)');
      cy.get('.square-on').should('have.css', 'border-color', 'rgb(33, 191, 77)');
      cy.get('.square-on').should('have.css', 'color', 'rgb(36, 207, 83)');
      cy.get('#square4').should('have.css', 'background-color', 'rgb(12, 232, 77)');
      cy.get('#square4').should('have.css', 'border-color', 'rgb(99, 213, 92)');
      cy.get('#square4').should('have.css', 'color', 'rgb(12, 232, 77)');
      cy.get('#timer-text').should('have.css', 'background-color', 'rgb(239, 241, 242)');
      cy.get('#timer-text').should('have.css', 'border-color', 'rgb(11, 180, 255)');
      cy.get('#timer-text').should('have.css', 'color', 'rgb(33, 38, 44)');
      cy.get('#timer-button').should('have.css', 'background-color', 'rgb(229, 231, 234)');
      cy.get('#timer-button').should('have.css', 'border-color', 'rgb(216, 219, 220)');
      cy.get('#timer-button').should('have.css', 'color', 'rgb(36, 40, 44)');
    });

    it('Check light mode colors for unlit progress squares', () => {
      cy.window().then((win) => {
        win.pomoTimer.setProgress(0);

        /* Check unlit progress square color */
        cy.get('.square-off').should('have.css', 'background-color', 'rgb(228, 230, 233)');
        cy.get('.square-off').should('have.css', 'border-color', 'rgb(228, 230, 233)');
        cy.get('.square-off').should('have.css', 'color', 'rgb(23, 27, 33)');
      });
    });

    it('Check light mode colors for work mode', () => {
      cy.window().then((win) => {
        win.pomoTimer.setTimer(1, 'work');
        cy.get('#timer-mode').should('have.css', 'background-color', 'rgb(36, 207, 83)');
        cy.get('#timer-mode').should('have.css', 'border-color', 'rgb(33, 191, 77)');
        cy.get('#timer-mode').should('have.css', 'color', 'rgb(255, 255, 255)');
      });
    });

    it('Check light mode colors for short break mode', () => {
      cy.window().then((win) => {
        win.pomoTimer.setTimer(1, 'short');
        cy.get('#timer-mode').should('have.css', 'background-color', 'rgb(46, 201, 173)');
        cy.get('#timer-mode').should('have.css', 'border-color', 'rgb(40, 179, 154)');
        cy.get('#timer-mode').should('have.css', 'color', 'rgb(255, 255, 255)');
      });
    });

    it('Check light mode colors for long break mode', () => {
      cy.window().then((win) => {
        win.pomoTimer.setTimer(1, 'long');
        cy.get('#timer-mode').should('have.css', 'background-color', 'rgb(11, 180, 255)');
        cy.get('#timer-mode').should('have.css', 'border-color', 'rgb(8, 164, 231)');
        cy.get('#timer-mode').should('have.css', 'color', 'rgb(255, 255, 255)');
      });
    });

    if (!fromControl) {
      it('Toggle dark mode', () => {
        cy.get('#settings-button').click();
        cy.get('#dark-slider').click();
        cy.get('#settings-close-button').click();
      });
    }
  });
}

function testUITimerCalm() {
  describe('Test setCalm on pomoTimer', { includeShadowDom: true }, () => {
    it('Check if pomoTimer exists', () => {
      cy.window().then((win) => {
        expect(win.pomoTimer).to.exist;
      });
    });

    it('Toggle calm mode', () => {
      cy.get('#settings-button').click();
      cy.get('#calm-slider').click();
      cy.get('#settings-close-button').click();
    });

    it('Check timer text in calm mode', () => {
      /* Timer shouldn't display seconds in calm mode */
      cy.get('#timer-text').then(($text) => {
        expect($text).to.contain('m');
        expect($text).to.not.contain(':');
      });
    });

    it('Toggle busy mode', () => {
      cy.get('#settings-button').click();
      cy.get('#calm-slider').click();
      cy.get('#settings-close-button').click();
    });
  });
}

testUITimerDark();
testUITimerLight(false);
testUITimerCalm();
export { testUITimerDark, testUITimerLight, testUITimerCalm };
