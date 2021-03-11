describe("Open Page", () => {
  it("Opens index.html", () => {
      cy.visit('./source/index.html')
  });
});

/* Starter Tests to find elements on page */

// Used for calling functions on the component
describe('Find Timer Element with JS', () => {
  it('Get element (\'Timer\')', () => {
      cy.window().then((win) => {
          expect(win.pomoTimer).to.exist;
      });
  });
});

/* Add your own tests here */
describe('Find Timer Elements', { includeShadowDom: true }, () => {
  it('Get mode text via ID', () => {
    cy.get('#timer-mode');
  });

  it('Get timer text via class', () => {
    cy.get('.time');
  });

  it('Get toggle button via ID', () => {
    cy.get('#timer-button');
  });
});

describe('Call timer\'s public functions', { includeShadowDom: true }, () => {
  let num = 12;

  // SET WORK MODE
  it('Call setTimer for work', () => {
    cy.window().then((win) => {
        win.pomoTimer.setTimer(num, 'work');
    });
  });

  it('Check that total seconds is accurate', () => {
    cy.window().then((win) => {
        expect(win.pomoTimer.totalSeconds).to.eq(num * 60);
    });
  });

  it('Mode should be \'Work\'', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('WORK');
    });
  });

  it('Button should be \'Start\'', () => {
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });

  // SET SHORT BREAK
  num = 5;
  it('Call setTimer for short break', () => {
    cy.window().then((win) => {
        win.pomoTimer.setTimer(num, 'short break');
    });
  });

  it('Check that total seconds is accurate', () => {
    cy.window().then((win) => {
        expect(win.pomoTimer.totalSeconds).to.eq(num * 60);
    });
  });

  it('Mode should be \'Short Break\'', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('SHORT');
    });
  });

  it('Button should be \'Start\'', () => {
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });
});

/*
describe('Basic Button Toggles', { includeShadowDom: true }, () => {
  it('Button toggles when Start clicked', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-button').then(($el) => {
      expect($el).to.have.attr('class', 'reset');
    });
  });

  it('Button toggles when Reset clicked', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-button').then(($el) => {
      expect($el).to.have.attr('class', 'start');
    });
  });
});*/
