describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

/* Starter Tests to find elements on page */

// Used for calling functions on the component
describe('Find Timer Element with JS', () => {
  it("Get element ('Timer')", () => {
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

  it('Get timer text via ID', () => {
    cy.get('#timer-text');
  });

  it('Get space via class', () => {
    cy.get('.space');
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

  it("Mode should be 'Work'", () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('WORK');
    });
  });

  it("Button should be 'Start'", () => {
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

  it("Mode should be 'Short Break'", () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('SHORT');
    });
  });

  it("Button should be 'Start'", () => {
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });
});

/*
describe('Check Resets', { includeShadowDom: true }, () => {
  // NOTE: timeout length should change if timer speed does
  it('Clear out previous test settings to 02:00', () => {
    cy.window().then((win) => {
      win.pomoTimer.setTimer(2, 'work');
    });
  });
  it('Check if we can reset at 01:59', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-text')
      .contains('01:59')
      .then(() => {
        cy.get('#timer-button')
          .click()
          .then(($el) => {
            expect($el).to.contain('Start');
          });
      });
  });
  // NOTE: timeout length should change if timer speed does
  it('Check if we can reset at 00:01', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-text')
      .contains('00:01', { timeout: 30000 })
      .then(() => {
        cy.get('#timer-button')
          .click()
          .then(($el) => {
            expect($el).to.contain('Start');
          });
      });
  });
  // NOTE: timeout length should change if timer speed does
  it('Check if we can reset at 00:00', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-text')
      .contains('00:00', { timeout: 30500 })
      .then(() => {
        cy.get('#timer-button')
          .click()
          .then(($el) => {
            expect($el).to.contain('Start');
          });
      });
  });
}); */

describe('Check setting Dark and Light Mode', { includeShadowDom: true }, () => {
  it('Set to Dark Mode', () => {
    cy.window().then((win) => {
      win.pomoTimer.setTimer(2, 'work');
      win.pomoTimer.setDark(true);
    });
  });

  it('Check that timer text is in dark mode', () => {
    cy.get('#timer-text').then(($el) => {
      expect($el).to.have.css('color', 'rgb(162, 170, 181)');
    });
  });

  it('Set to Light Mode', () => {
    cy.window().then((win) => {
      win.pomoTimer.setTimer(2, 'work');
      win.pomoTimer.setDark(false);
    });
  });

  it('Check that timer text is in light mode', () => {
    cy.get('#timer-text').then(($el) => {
      expect($el).to.have.css('color', 'rgb(33, 38, 44)');
    });
  });

  it('Reset to Dark Mode', () => {
    cy.window().then((win) => {
      win.pomoTimer.setTimer(2, 'work');
      win.pomoTimer.setDark(true);
    });
  });

  it('Check that timer text is in dark mode', () => {
    cy.get('#timer-text').then(($el) => {
      expect($el).to.have.css('color', 'rgb(162, 170, 181)');
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
    cy.wait(250); // wait a fast 1s
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(119); // 01:59
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('2m');
      });
    });
  });

  it('Check that text is 2m when reset after a 4 sec', () => {
    cy.wait(4000);
    cy.get('#timer-button')
      .click()
      .then(() => {
        cy.get('#timer-text').then(($el) => {
          expect($el).to.contain('2m');
        });
      });
  });

  it('Check that 01:01 => 2m', () => {
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
    cy.get('#timer-button').click();

    cy.wait(14750); // wait 1 sec
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(61);
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('2m');
      });
    });
    cy.get('#timer-button').click(); // reset for next test
  });

  it('Check that 01:00 => 1m & 00:59 => 1m', () => {
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
    cy.get('#timer-button').click();

    cy.wait(15000); // wait 1 min
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(60);
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('1m');
      });
    });

    cy.wait(250); // wait 1 sec
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(59);
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('1m');
      });
    });

    cy.get('#timer-button').click(); // reset for next test
  });

  it('Check that 00:50 => 1m', () => {
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
    cy.get('#timer-button').click();

    cy.wait(17500); // wait 1 min, 10 sec
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(50);
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('1m');
      });
    });
    cy.get('#timer-button').click(); // reset for next test
  });

  it('Check that 00:01 => 1m & 00:00 => 0m', () => {
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
    cy.get('#timer-button').click();

    cy.wait(29750); // wait 1 min, 59 sec
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(1);
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('1m');
      });
    });

    cy.wait(250); // wait 1 sec
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(0);
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('0m');
      });
    });

    cy.get('#timer-button').click(); // reset for next test
  });

  it('Check that it resets normally => 2m', () => {
    cy.wait(250);
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
    cy.window().then((win) => {
      expect(win.pomoTimer.totalSeconds).to.eq(120);
      cy.get('#timer-text').then(($el) => {
        expect($el).to.contain('2m');
      });
    });
  });
});

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
  it("Listen for event after 'Start' is clicked", () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onStart = () => {
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
  it("Listen for event after 'Reset' is clicked at 01:30", () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onReset = () => {
          $el[0].removeEventListener('timerReset', onReset);
          resolve();
        };
        $el[0].addEventListener('timerReset', onReset);
        cy.get('#timer-text')
          .contains('1:30', { timeout: 10000 })
          .then(() => {
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
        const onFinish = () => {
          $el[0].removeEventListener('timerFinish', onFinish);
          resolve();
        };
        $el[0].addEventListener('timerFinish', onFinish);
      });
    });
    cy.wrap(eventPromise);
  });
  it("Listen for event 'tick' while timer counts down", () => {
    cy.get('#timer-button').click();
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onTick = () => {
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
    cy.get('#timer-button').click(); // first reset
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
  it('> No progress should have been made', () => {
    cy.get('#square1').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
    cy.get('#square2').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
    cy.get('#square3').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
    cy.get('#square4').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
  });
  it('Set Timer for Short Break #1 after listening for Work #1 end', () => {
    cy.get('#timer-button').click();
    cy.wait(30000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = () => {
          $el[0].removeEventListener('timerFinish', onFinish);
          $el[0].setTimer(2, 'short break');
          $el[0].setProgress(1);
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
      expect($el).to.have.css('color', 'rgb(144, 102, 255)');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('2:00');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });
  it('> Check progress was updated (to 1)', () => {
    cy.get('#square1').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square2').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
    cy.get('#square3').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
    cy.get('#square4').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
  });

  it('Set Timer for Work #2 after listening for Short Break #1 end', () => {
    cy.get('#timer-button').click();
    cy.wait(30000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = () => {
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
      expect($el).to.have.css('color', 'rgb(121, 208, 113)');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('2:00');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });
  it('> Check no new progress made', () => {
    cy.get('#square1').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square2').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
    cy.get('#square3').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
    cy.get('#square4').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
  });
  it('Set Timer for Short Break #2 after listening for Work #2 end', () => {
    cy.get('#timer-button').click();
    cy.wait(30000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = () => {
          $el[0].removeEventListener('timerFinish', onFinish);
          $el[0].setTimer(1, 'short break');
          $el[0].setProgress(2);
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
      expect($el).to.have.css('color', 'rgb(144, 102, 255)');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('1:00');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });
  it('> Check progress was updated (to 2)', () => {
    cy.get('#square1').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square2').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square3').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
    cy.get('#square4').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
  });
  it('Set Timer for Work #3 after listening for Short Break #2 end', () => {
    cy.get('#timer-button').click();
    cy.wait(15000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = () => {
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
      expect($el).to.have.css('color', 'rgb(121, 208, 113)');
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
        const onFinish = () => {
          $el[0].removeEventListener('timerFinish', onFinish);
          $el[0].setTimer(1, 'short break');
          $el[0].setProgress(3);
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
  it('> Check progress was updated (to 3)', () => {
    cy.get('#square1').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square2').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square3').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square4').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
  });
  it('Set Timer for Work #4 after listening for Short Break #3 end', () => {
    cy.get('#timer-button').click();
    cy.wait(15000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = () => {
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
      expect($el).to.have.css('color', 'rgb(121, 208, 113)');
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
        const onFinish = () => {
          $el[0].removeEventListener('timerFinish', onFinish);
          $el[0].setTimer(1, 'long break');
          $el[0].setProgress(4);
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
      expect($el).to.have.css('color', 'rgb(59, 169, 255)');
    });
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('1:00');
    });
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });
  it('> Check progress was updated (to 4)', () => {
    cy.get('#square1').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square2').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square3').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square4').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
  });
  it('> Set Timer for Work #1 after listening for Long Break #1 end', () => {
    cy.get('#timer-button').click();
    cy.wait(15000);
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-timer').then(($el) => {
        const onFinish = () => {
          $el[0].removeEventListener('timerFinish', onFinish);
          $el[0].setTimer(1, 'work');
          $el[0].setProgress(0);
          resolve();
        };
        $el[0].addEventListener('timerFinish', onFinish);
      });
    });
    cy.wrap(eventPromise);
  });
  it('> Check progress was cleared', () => {
    cy.get('#square1').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
    cy.get('#square2').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
    cy.get('#square3').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
    cy.get('#square4').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
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
  });
});

/*
describe('Basic Button Toggles', { includeShadowDom: true }, () => {
  it('Button toggles when Start clicked', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Reset');
    });
  });

  it('Button toggles when Reset clicked', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });
}); */

describe('Accessibility when click then reset', { includeShadowDom: true }, () => {
  it('Button toggles when Start clicked', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Reset');
    });
  });
  it('Button toggles when r is pressed (Reset) & True', () => {
    cy.window().then((win) => {
      win.pomoTimer.setAccessibility(true);
    });
    cy.get('body')
      .type('r')
      .then(() => {
        cy.get('#timer-button').then(($el) => {
          expect($el).to.contain('Start');
        });
      });
  });
});

describe('Basic Button Toggles for Accessibility when on', { includeShadowDom: true }, () => {
  it('Button toggles when s is pressed (Start) & True', () => {
    cy.window().then((win) => {
      win.pomoTimer.setAccessibility(true);
    });
    cy.get('body')
      .type('s')
      .then(() => {
        cy.get('#timer-button').then(($el) => {
          expect($el).to.contain('Reset');
        });
      });
  });
  it('Button toggles when r is pressed (Reset) & True', () => {
    cy.window().then((win) => {
      win.pomoTimer.setAccessibility(true);
    });
    cy.get('body')
      .type('r')
      .then(() => {
        cy.get('#timer-button').then(($el) => {
          expect($el).to.contain('Start');
        });
      });
  });
});

describe('Basic Button Toggles for Accessibility when off', { includeShadowDom: true }, () => {
  it('Button toggles when s is pressed (Start) & False', () => {
    cy.window().then((win) => {
      win.pomoTimer.setAccessibility(false);
    });
    cy.get('body')
      .type('s')
      .then(() => {
        cy.get('#timer-button').then(($el) => {
          expect($el).to.contain('Start');
        });
      });
  });
  it('Button toggles when r is pressed (Reset) & False', () => {
    cy.window().then((win) => {
      win.pomoTimer.setAccessibility(false);
    });
    cy.get('body')
      .type('r')
      .then(() => {
        cy.get('#timer-button').then(($el) => {
          expect($el).to.contain('Start');
        });
      });
  });
});

describe('Accessibility when on then off then on', { includeShadowDom: true }, () => {
  it('Button toggles when s is pressed (Start) & True', () => {
    cy.window().then((win) => {
      win.pomoTimer.setAccessibility(true);
    });
    cy.get('body')
      .type('s')
      .then(() => {
        cy.get('#timer-button').then(($el) => {
          expect($el).to.contain('Reset');
        });
      });
  });
  it('Button toggles when r is pressed (Reset) & False', () => {
    cy.window().then((win) => {
      win.pomoTimer.setAccessibility(false);
    });
    cy.get('body')
      .type('r')
      .then(() => {
        cy.get('#timer-button').then(($el) => {
          expect($el).to.contain('Reset');
        });
      });
  });
  it('Button toggles when r is pressed (Reset) & True', () => {
    cy.window().then((win) => {
      win.pomoTimer.setAccessibility(true);
    });
    cy.get('body')
      .type('r')
      .then(() => {
        cy.get('#timer-button').then(($el) => {
          expect($el).to.contain('Start');
        });
      });
  });
});

describe('Accessibility when off then click', { includeShadowDom: true }, () => {
  it('Button toggles when s is pressed (Start) & False', () => {
    cy.window().then((win) => {
      win.pomoTimer.setAccessibility(false);
    });
    cy.get('body')
      .type('s')
      .then(() => {
        cy.get('#timer-button').then(($el) => {
          expect($el).to.contain('Start');
        });
      });
  });
  it('Button toggles when r is pressed (Reset) & True', () => {
    cy.window().then((win) => {
      win.pomoTimer.setAccessibility(true);
    });
    cy.get('body')
      .type('r')
      .then(() => {
        cy.get('#timer-button').then(($el) => {
          expect($el).to.contain('Start');
        });
      });
  });
});

