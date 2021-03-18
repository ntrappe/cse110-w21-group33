/* test of control modifying timer */
describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });

  it('Speed up timer for testing', () => {
    cy.window().then((win) => {
      win.pomoTimer.timerSpeed = 250; // 1/4 s
    });
  });
});

/* find timer on window */
describe('Find Timer Element with JS', () => {
  it("Get element ('Timer')", () => {
    cy.window().then((win) => {
      expect(win.pomoTimer).to.exist;
    });
  });
});

describe('Check initial state of timer', { includeShadowDom: true }, () => {
  it('Mode is Work', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('WORK');
    });
  });
  it('25:00 on clock', () => {
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('25');
    });
  });
  it('Button says Start', () => {
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });
});

describe('Initialize & run work time', { includeShadowDom: true }, () => {
  it('Open settings', () => {
    cy.get('#settings-button').click();
  });
  it('Set work to 1m via settings', () => {
    cy.get('#work-number').type('{selectall}{backspace}1', { force: true }).trigger('change');
    cy.get('#work-number').then(($el) => {
      expect($el).to.have.value(1);
    });
  });
  it('Close settings', () => {
    cy.get('#settings-close-button').click();
  });
  it('Check timer text is now 1m', () => {
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('1:');
    });
  });
  it('Start running work', () => {
    cy.get('#timer-button').click();
  });
});

describe('Do Work #1 ==> Set Short Break #1', { includeShadowDom: true }, () => {
  it('Mode is Work', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.contain('WORK');
    });
  });
  it('Button is now called Reset', () => {
    cy.get('#timer-button').then(($el) => {
      expect($el).to.contain('Reset');
    });
  });
  it('Progress should be 0', () => {
    cy.get('#square1').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
  });
  it('Run through 1m', () => {
    cy.wait(15500);
  });
  it('Mode is Short Break', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.have.attr('class', 'short-break');
    });
  });
  it('Progress should be 1', () => {
    cy.get('#square1').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square2').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
  });
});

describe('Do Short Break #1 ==> Set Work #2', { includeShadowDom: true }, () => {
  it('Open settings', () => {
    cy.get('#settings-button').click();
  });
  it('Set short break to 1m via settings', () => {
    cy.get('#short-break-number')
      .type('{selectall}{backspace}1', { force: true })
      .trigger('change');
    cy.get('#short-break-number').then(($el) => {
      expect($el).to.have.value(1);
    });
  });
  it('Close settings', () => {
    cy.get('#settings-close-button').click();
  });
  it('Mode is Short Break', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.have.attr('class', 'short-break');
    });
  });
  it('Check timer text is now 1m', () => {
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('1:');
    });
  });
  it('Run through 1m', () => {
    cy.get('#timer-button').click();
    cy.wait(15500);
  });
});

describe('Do Work #2 ==> Set Short Break #2', { includeShadowDom: true }, () => {
  it('Mode is Work', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.have.attr('class', 'work');
    });
  });
  it('Control saved work as 1m', () => {
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('1:');
    });
  });
  it('Run through 1m', () => {
    cy.get('#timer-button').click();
    cy.wait(15500);
  });
  it('Progress should be 2', () => {
    cy.get('#square1').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square2').then(($el) => {
      expect($el).to.have.attr('class', 'square-on');
    });
    cy.get('#square3').then(($el) => {
      expect($el).to.have.attr('class', 'square-off');
    });
  });
});

describe('Do Short Break #2 ==> Set Work #3', { includeShadowDom: true }, () => {
  it('Open settings', () => {
    cy.get('#settings-button').click();
  });
  it('Turn on Calm Mode', () => {
    cy.window().then((win) => {
      expect(win.pomoSettings.calm).to.eq(false);
    });
    cy.get('#calm-slider').click();
    cy.window().then((win) => {
      expect(win.pomoSettings.calm).to.eq(true);
    });
  });
  it('Close settings', () => {
    cy.get('#settings-close-button').click();
  });
  it('Mode is Short Break', () => {
    cy.get('#timer-mode').then(($el) => {
      expect($el).to.have.attr('class', 'short-break');
    });
  });
  it('Control saved short break as 1m', () => {
    cy.get('#timer-text').then(($el) => {
      expect($el).to.contain('1m');
    });
  });
  it('Run through 1m', () => {
    cy.get('#timer-button').click();
    cy.wait(15500);
  });
});
