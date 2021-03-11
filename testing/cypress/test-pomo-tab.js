describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

/* Test for setTab */
describe('test setTab without calm mode', () => {
  /*
   * Test 10:01 and 01:10 to see if the function can handle padding 0
   * Also test for work/short break/long break
   */

  it('setTab 10:01 - Work', () => {
    cy.window().then((win) => {
      win.pomoTab.setCalm(false);
      win.pomoTab.setTab(601, 'work');
    });
    cy.title().should('eq', '10:01 - Work');
  });

  it('setTab 01:10 - Short Break', () => {
    cy.window().then((win) => {
      win.pomoTab.setCalm(false);
      win.pomoTab.setTab(70, 'short break');
    });
    cy.title().should('eq', '01:10 - Short Break');
  });

  it('setTab 12:34 - Long Break', () => {
    cy.window().then((win) => {
      win.pomoTab.setCalm(false);
      win.pomoTab.setTab(754, 'long break');
    });
    cy.title().should('eq', '12:34 - Long Break');
  });

  /* Test for default switch */
  it('setTab 12:34 -', () => {
    cy.window().then((win) => {
      win.pomoTab.setCalm(false);
      win.pomoTab.setTab(754, 'long work');
    });
    cy.title().should('eq', '12:34 -');
  });

  /* Test for 00:00 */
  it('setTab 00:00 - Work', () => {
    cy.window().then((win) => {
      win.pomoTab.setCalm(false);
      win.pomoTab.setTab(0, 'work');
    });
    cy.title().should('eq', '00:00 - Work');
  });
});

/* Test for setTab with calm mode */
describe('test setTab with calm mode', () => {
  /*
   * Test 10:01 and 01:10 to see if the function can display ceiling value
   * Also test whole minute
   */
  it('setTab 10:01 - work', () => {
    cy.window().then((win) => {
      win.pomoTab.setCalm(true);
      win.pomoTab.setTab(601, 'work');
    });
    cy.title().should('eq', '11:00 - Work');
  });

  it('setTab 01:10 - Short Break', () => {
    cy.window().then((win) => {
      win.pomoTab.setCalm(true);
      win.pomoTab.setTab(70, 'short break');
    });
    cy.title().should('eq', '02:00 - Short Break');
  });

  it('setTab 12:00 - Long Break', () => {
    cy.window().then((win) => {
      win.pomoTab.setCalm(true);
      win.pomoTab.setTab(720, 'long break');
    });
    cy.title().should('eq', '12:00 - Long Break');
  });

  /* Test for 00:00 */
  it('setTab 00:00 - Work', () => {
    cy.window().then((win) => {
      win.pomoTab.setCalm(true);
      win.pomoTab.setTab(0, 'work');
    });
    cy.title().should('eq', '00:00 - Work');
  });
});

/* Test for setTab with default */
describe('test setTab with default', () => {
  /* Test if default will display the correct text */
  it('setTab default', () => {
    cy.window().then((win) => {
      win.pomoTab.defaultTab();
    });
    cy.title().should('eq', 'Pomodoro Timer');
  });
});
