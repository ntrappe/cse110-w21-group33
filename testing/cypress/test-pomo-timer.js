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

describe('Initialize timer with public functions', { includeShadowDom: true }, () => {
  let num = 2;

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
});

describe('Check all events', { includeShadowDom: true }, () => {
  it('Button shows start', () => {
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });

  it('Click start and check event', () => {
    cy.get('#pomo-timer').then(($el) => {
      return new Cypress.Promise(resolve => {
        const onStart = () => {
          $el[0].removeEventListener('timerStart', onStart);
          resolve();
        };
        $el[0].addEventListener('timerStart', onStart);
      });
    });

    cy.get('#timer-button').click();
    
    cy.get('#pomo-timer').then(($el) => {
      return new Cypress.Promise(resolve => {
        const onReset = () => {
          $el[0].removeEventListener('timerReset', onReset);
          resolve();
        };
        $el[0].addEventListener('timerReset', onReset);
      });
    });
  });
});
/*
describe('Run through 1 work session', { includeShadowDom: true }, () => {
  it('Click Start button', () => {
    cy.get('#timer-button').click();

    // listen for timer counting down with tick
    cy.get('#pomo-timer').then(($el) => {
      return new Cypress.Promise(resolve => {
        const onTick = () => {
          $el[0].removeEventListener('tick', onTick);
          resolve();
        };
        $el[0].addEventListener('tick', onTick);
      });
    });



    // wait until work session done (2m) and listen for a finish
    cy.wait(30000);
    cy.get('#pomo-timer').then(($el) => {
      return new Cypress.Promise(resolve => {
        const onFinish = () => {
          $el[0].removeEventListener('timerFinish', onFinish);
          resolve();
          cy.window().then((win) => {
            win.pomoTimer.setTimer(3, 'short break');
          })
        };
        $el[0].addEventListener('timerFinish', onFinish);
      });
    });
  });
});*/

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
