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
/*
describe('Check Resets',  { includeShadowDom: true }, () => {
  // NOTE: timeout length should change if timer speed does
 it('Check if we can reset at 01:59', () => {
   cy.get('#timer-button').click();
   cy.get('#timer-text').contains('01:59').then(($el) => {
     cy.get('#timer-button').click().then(($el) => {
       expect($el).to.have.attr('class', 'start');
     });
   });
 });

  // NOTE: timeout length should change if timer speed does
 it('Check if we can reset at 00:01', () => {
   cy.get('#timer-button').click();
   cy.get('#timer-text').contains('00:01', { timeout: 30000 }).then(($el) => {
     cy.get('#timer-button').click().then(($el) => {
       expect($el).to.have.attr('class', 'start');
     });
   });
 });

  // NOTE: timeout length should change if timer speed does
 it('Check if we can reset at 00:00', () => {
   cy.get('#timer-button').click();
   cy.get('#timer-text').contains('00:00', { timeout: 30500 }).then(($el) => {
     cy.get('#timer-button').click().then(($el) => {
       expect($el).to.have.attr('class', 'start');
     });
   });
 });
}); */

// UI TESTING
describe('Check setting dark and light mode', { includeShadowDom: true }, () => {
  it('Set to Dark Mode', () => {
    cy.window().then((win) => {
      win.pomoTimer.setDark(true);
    });
  });

  it('Check elements were set to Dark Mode', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.have.attr('data-mode', 'dark-mode');
    });
    cy.get('#timer-progress-container').then(($el) => {
      expect($el).to.have.attr('data-mode', 'dark-mode');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.have.attr('data-mode', 'dark-mode');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.have.attr('data-mode', 'dark-mode');
    });
  });

  it('Set to Light Mode', () => {
    cy.window().then((win) => {
      win.pomoTimer.setDark(false);
    });
  });

  it('Check elements were set to Light Mode', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.have.attr('data-mode', 'light-mode');
    });
    cy.get('#timer-progress-container').then(($el) => {
      expect($el).to.have.attr('data-mode', 'light-mode');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.have.attr('data-mode', 'light-mode');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.have.attr('data-mode', 'light-mode');
    });
  });
});

describe('Toggle between Calm and not Calm Mode', { includeShadowDom: true }, () => {
  it('Set to Calm Mode & 5m', () => {
    cy.window().then((win) => {
      win.pomoTimer.setTimer(5, 'work');
      win.pomoTimer.setCalm(true);
    });
  });

  it('Check that timer text only shows minutes', () => {
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('5m');
    });
  });

  it('Set to not Calm Mode & 1m', () => {
    cy.window().then((win) => {
      win.pomoTimer.setTimer(1, 'work');
      win.pomoTimer.setCalm(false);
    });
  });

  it('Check that timer text shows minutes + seconds', () => {
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain(':00');
    });
  });
});

// NOTE: it can be hard to determine how long to wait for so switch to NOT
// calm mode to test timeout against min/sec on screen
// cy.get('#timer-text').contains('1:01', { timeout: 15000 }).then(($el) => {});
// otherwise work against totalSeconds to be precise
describe('Test Calm Mode', { includeShadowDom: true }, () => {
  it('Set to Calm Mode & 2m', () => {
    cy.window().then((win) => {
      win.pomoTimer.setTimer(2, 'work');
      win.pomoTimer.setCalm(true);
    });
  });

  it('Check that timer text only shows minutes', () => {
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('2m');
    });
  });

  it('Check that 1:59 => 2m', () => {
    cy.get('#timer-button').click();
    cy.wait(250);     // wait a fast 1s
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(119);    // 01:59
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('2m');
      });
    });
  });

  it('Check that text is 2m when reset after a 4 sec', () => {
    cy.wait(4000);
    cy.get('#timer-button').click().then(() => {
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('2m');
      });
    }); 
  });
   
  it('Run through 2m and check 01:59 => 2m, 01:01 => 2m, 01:00 => 1m', () => {
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
    cy.get('#timer-button').click();

    cy.wait(250);
    cy.window().then((win) => {
      console.log(win.pomoTimer.totalSeconds);
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('2m');
      });
    });
  });
/*
  it('Check that 01:01 => 2m', () => {
    cy.wait(15000);     // wait a fast 1m ish
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(61);    // 01:01
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('2m');
      });
    });
  });

  it('Check that 01:00 => 1m', () => {
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(60);    // 01:01
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('1m');
      });
    });
  });

  it('Check that 00:50 => 1m', () => {
    cy.wait(2500);      // wait a fast 10s
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(50);    // 00:50
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('1m');
      });
    });
  });

  it('Check that 00:01 => 1m', () => {
    cy.wait(12500);     // wait a fast 50s ish
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(1);    // 00:01
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('1m');
      });
    });
  }); 

  // sometimes, if there was a delay previously, these tests are marked
  // as incorrect so maybe first reset

  it('Check that 00:00 => 0m', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-button').click();
    cy.wait(30250);
    cy.window().then((win) => {
      console.log(win.pomoTimer.totalSeconds);
      expect(win.pomoTimer.totalSeconds).to.eq(0);    // 00:00
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('0m');
      });
    });
  });

  it('Check that resets normally to 2m', () => {
    cy.wait(500);     // wait a fast 2s (works with 1s too)
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('2m');
    });
  }); */
});
/*
describe('Check all events', { includeShadowDom: true }, () => {
  it('Set not Calm mode & 2m', () => {
    cy.window().then((win) => {
      win.pomoTimer.setTimer(2, 'work');
      win.pomoTimer.setCalm(false);
    });
  });

  it('Button shows start', () => {
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });

  it('Listen for event after \'Start\' is clicked', () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onStart = (e) => {
          $el[0].removeEventListener('timerStart', onStart);
          resolve();
        };
        $el[0].addEventListener('timerStart', onStart);
        cy.get('#timer-button').click();
      });
    });
    cy.wrap(eventPromise);
  });

  // NOTE: timeout length should change if timer speed does
  it('Listen for event after \'Reset\' is clicked at 01:30', () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onReset = (e) => {
          $el[0].removeEventListener('timerReset', onReset);
          resolve();
        };
        $el[0].addEventListener('timerReset', onReset);
        cy.get('#timer-text').contains('1:30', { timeout: 10000 }).then(($el) => {
          cy.get('#timer-button').click();
        });
      });
    });
    cy.wrap(eventPromise);
  });

  // NOTE: timeout length should change if timer speed does
  it('Listen for event after timer finishes at 00:00', () => {
    cy.get('#timer-button').click();
    cy.wait(30000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = (e) => {
          $el[0].removeEventListener('timerFinish', onFinish);
          resolve();
        };
        $el[0].addEventListener('timerFinish', onFinish);
      });
    });
    cy.wrap(eventPromise);
  });

  it('Listen for event \'tick\' while timer counts down', () => {
    cy.get('#timer-button').click();
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onTick = (e) => {
          $el[0].removeEventListener('tick', onTick);
          resolve();
        };
        $el[0].addEventListener('tick', onTick);
      });
    });
    cy.wrap(eventPromise);
  });
}); 

describe('Normal Behavior: Go Through 1 Pomo Set', { includeShadowDom: true }, () => {
  it('Set Timer for Work #1 with 2m', () => {
    cy.get('#timer-button').click();      // first reset
    cy.window().then((win) => {
      win.pomoTimer.setTimer(2, 'work');
    });
  });

  it('> Check mode, timer text, & button for Work #1', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('WORK');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('2:00');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });

  it('Set Timer for Short Break #1 after listening for Work #1 end', () => {
    cy.get('#timer-button').click();
    cy.wait(30000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = (e) => {
          $el[0].removeEventListener('timerFinish', onFinish);
          $el[0].setTimer(2, 'short break');
          resolve();
        };
        $el[0].addEventListener('timerFinish', onFinish);
      });
    });
    cy.wrap(eventPromise);
  });

  it('> Check mode, timer text, & button for Short Break #1', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('SHORT BREAK');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('2:00');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });

  it('Set Timer for Work #2 after listening for Short Break #1 end', () => {
    cy.get('#timer-button').click();
    cy.wait(30000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = (e) => {
          $el[0].removeEventListener('timerFinish', onFinish);
          $el[0].setTimer(2, 'work');
          resolve();
        };
        $el[0].addEventListener('timerFinish', onFinish);
      });
    });
    cy.wrap(eventPromise);
  });

  it('> Check mode, timer text, & button for Work #2', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('WORK');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('2:00');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });

  it('Set Timer for Short Break #2 after listening for Work #2 end', () => {
    cy.get('#timer-button').click();
    cy.wait(30000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = (e) => {
          $el[0].removeEventListener('timerFinish', onFinish);
          $el[0].setTimer(1, 'short break');
          resolve();
        };
        $el[0].addEventListener('timerFinish', onFinish);
      });
    });
    cy.wrap(eventPromise);
  });

  it('> Check mode, timer text for Short Break #2', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('SHORT BREAK');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('1:00');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });

  it('Set Timer for Work #3 after listening for Short Break #2 end', () => {
    cy.get('#timer-button').click();
    cy.wait(15000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = (e) => {
          $el[0].removeEventListener('timerFinish', onFinish);
          $el[0].setTimer(1, 'work');
          resolve();
        };
        $el[0].addEventListener('timerFinish', onFinish);
      });
    });
    cy.wrap(eventPromise);
  });

  it('> Check mode, timer text for Work #3', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('WORK');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('1:00');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });

  it('Set Timer for Short Break #3 after listening for Work #3 end', () => {
    cy.get('#timer-button').click();
    cy.wait(15000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = (e) => {
          $el[0].removeEventListener('timerFinish', onFinish);
          $el[0].setTimer(1, 'short break');
          resolve();
        };
        $el[0].addEventListener('timerFinish', onFinish);
      });
    });
    cy.wrap(eventPromise);
  });

  it('> Check mode, timer text for Short Break #3', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('SHORT BREAK');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('1:00');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });

  it('Set Timer for Work #4 after listening for Short Break #3 end', () => {
    cy.get('#timer-button').click();
    cy.wait(15000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = (e) => {
          $el[0].removeEventListener('timerFinish', onFinish);
          $el[0].setTimer(1, 'work');
          resolve();
        };
        $el[0].addEventListener('timerFinish', onFinish);
      });
    });
    cy.wrap(eventPromise);
  });

  it('> Check mode, timer text for Work #4', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('WORK');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('1:00');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });

  it('Set Timer for Long Break #1 after listening for Work #4 end', () => {
    cy.get('#timer-button').click();
    cy.wait(15000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = (e) => {
          $el[0].removeEventListener('timerFinish', onFinish);
          $el[0].setTimer(1, 'long break');
          resolve();
        };
        $el[0].addEventListener('timerFinish', onFinish);
      });
    });
    cy.wrap(eventPromise);
  });

  it('> Check mode, timer text for Long Break #1', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('LONG BREAK');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('1:00');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });
});

describe('Bad Behavior: Invalid Timer Setting', { includeShadowDom: true }, () => {
  it('Set timer to 10,000m', () => {
    cy.window().then((win) => {
      win.pomoTimer.setTimer(10000, 'work');
    });
  });

  it('Timer should have defaulted to 2m (via helpers.js)', () => {
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.be.eq(2 * 60);
    });
  })
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
