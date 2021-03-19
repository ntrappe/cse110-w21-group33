describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

describe('Testing Settings with Finish', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });

  it('Toggling Dark Mode off & Check that css was changed', () => {
    cy.get('#settings-button').click();
    cy.get('#dark-slider').click();
    cy.get('#settings-close-button').click();
    cy.get('#statistics-styles').should(
      'have.attr',
      'href',
      './components/pomo-finish/pomo-finish-light.css'
    );
  });

  it('Toggling Dark Mode on & Check that css was changed', () => {
    cy.get('#settings-button').click();
    cy.get('#dark-slider').click();
    cy.get('#dark-slider').click();
    cy.get('#settings-close-button').click();
    cy.get('#statistics-styles').should(
      'have.attr',
      'href',
      './components/pomo-finish/pomo-finish.css'
    );
  });

  it('Opening Settings and Checking that finish is not opened', () => {
    cy.get('#settings-button').click();
    cy.get('#finish-button').should('be.disabled');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });
});

describe('Testing Timer with Stat', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });

  it('Starting Timer and Stats that stat is not opened', () => {
    cy.get('#timer-button').click();
    cy.get('#finish-button').should('be.disabled');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });

  it('Starting Timer, Opening and closing settings, and checking that stat is disabled', () => {
    cy.get('#timer-button').click();
    cy.get('#settings-button').click();
    cy.get('#settings-close-button').click();
    cy.get('#info-button').should('be.disabled');
  });

  it('Starting Timer and stopping timer and Checking that stat is opened', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-button').click();
    cy.get('#finish-button').should('not.be.disabled');
    cy.get('#finish-button').click();
    cy.get('#statistics-modal').should('have.css', 'display', 'block');
  });
});

describe('Testing Info with Stats', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
  });

  it('Toggling Dark Mode on & Check that css was changed', () => {
    cy.get('#info-button').click();
    cy.get('#finish-button').should('be.disabled');
    cy.get('#statistics-modal').should('have.css', 'display', 'none');
  });

  it('Opening Info and Checking that stats is not opened', () => {
    cy.get('#info-button').click();
    cy.get('#info-close-button').click();
    cy.get('#finish-button').should('not.be.disabled');
    cy.get('#finish-button').click();
    cy.get('#statistics-modal').should('have.css', 'display', 'block');
  });
});

describe('Testing a complete cycle for stats page', { includeShadowDom: true }, () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });

  it('Speed up timer for testing', () => {
    cy.window().then((win) => {
      win.pomoTimer.timerSpeed = 100; // 1/10 s
    });
  });

  it('Setting an interruption and checking if stats shows 1', () => {
    cy.get('#timer-button').click();
    cy.get('#timer-button').click();
    cy.get('#finish-button').click();
    cy.get('#statistics-panel').then(($el) => {
      expect($el).to.contain('Pomodoro Completed: 0');
      expect($el).to.contain('Short Breaks: 0');
      expect($el).to.contain('Long Breaks: 0');
      expect($el).to.contain('Interrupted Session: 1');
    });
    cy.get('#statistics-close-button').click();
  });

  it('Setting Work/Short/Long duration to 1min', () => {
    cy.get('#settings-button').click();
    cy.get('#work-number').type('{selectall}{backspace}1', { force: true }).trigger('change');
    cy.get('#short-break-number')
      .type('{selectall}{backspace}1', { force: true })
      .trigger('change');
    cy.get('#long-break-number').type('{selectall}{backspace}1', { force: true }).trigger('change');
    cy.get('#settings-close-button').click();
  });

  it('Checking stats after 1 work session is completed', () => {
    cy.get('#timer-button').click();
    cy.wait(6200);
    cy.get('#finish-button').click();
    cy.get('#statistics-panel').then(($el) => {
      expect($el).to.contain('Pomodoro Completed: 1');
      expect($el).to.contain('Short Breaks: 0');
      expect($el).to.contain('Long Breaks: 0');
      expect($el).to.contain('Interrupted Session: 1');
    });
    cy.get('#statistics-close-button').click();
  });

  it('Checking stats after 1 short break is completed', () => {
    cy.get('#timer-button').click();
    cy.wait(6200);
    cy.get('#finish-button').click();
    cy.get('#statistics-panel').then(($el) => {
      expect($el).to.contain('Pomodoro Completed: 1');
      expect($el).to.contain('Short Breaks: 1');
      expect($el).to.contain('Long Breaks: 0');
      expect($el).to.contain('Interrupted Session: 1');
    });
    cy.get('#statistics-close-button').click();
  });

  it('Running a 2nd work session', () => {
    cy.get('#timer-button').click();
    cy.wait(6200);
    cy.get('#finish-button').click();
    cy.get('#statistics-panel').then(($el) => {
      expect($el).to.contain('Pomodoro Completed: 2');
      expect($el).to.contain('Short Breaks: 1');
      expect($el).to.contain('Long Breaks: 0');
      expect($el).to.contain('Interrupted Session: 1');
    });
    cy.get('#statistics-close-button').click();
  });

  it('Running a 2nd short break', () => {
    cy.get('#timer-button').click();
    cy.wait(6200);
    cy.get('#finish-button').click();
    cy.get('#statistics-panel').then(($el) => {
      expect($el).to.contain('Pomodoro Completed: 2');
      expect($el).to.contain('Short Breaks: 2');
      expect($el).to.contain('Long Breaks: 0');
      expect($el).to.contain('Interrupted Session: 1');
    });
    cy.get('#statistics-close-button').click();
  });

  it('Running 2 more work session and 1 short break and 1 long break', () => {
    cy.get('#timer-button').click();
    cy.wait(6200);
    cy.get('#timer-button').click();
    cy.wait(6200);
    cy.get('#timer-button').click();
    cy.wait(6200);
    cy.get('#timer-button').click();
    cy.wait(6200);
  });

  it('Checkng if full pomodoro cycle is correct on stats', () => {
    cy.get('#finish-button').click();
    cy.get('#statistics-panel').then(($el) => {
      expect($el).to.contain('Pomodoro Completed: 4');
      expect($el).to.contain('Short Breaks: 3');
      expect($el).to.contain('Long Breaks: 1');
      expect($el).to.contain('Interrupted Session: 1');
    });
    cy.get('#statistics-close-button').click();
  });
});
