describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

// Check 1024 * 768 screen
describe('Check a 1024 * 768 screen', { includeShadowDom: true }, () => {
  let resizeTriggered = false;
  let spyTimer;
  let spyFinish;
  let spyInfo;
  let spySetting;

  beforeEach(() => {
    // Spies listen to change transform function to be called
    cy.window().then((win) => {
      spyTimer = cy.spy(win.pomoTimer, 'changeTransform').as('callTimerResize');
      spyFinish = cy.spy(win.pomoFinish, 'changeTransform').as('callFinishResize');
      spyInfo = cy.spy(win.pomoInfo, 'changeTransform').as('callFinishResize');
      spySetting = cy.spy(win.pomoSettings, 'changeTransform').as('callSettingResize');
    });
    // run these tests as if in a desktop
    // browser with a 768 monitor
    cy.window().then((win) => {
      win.addEventListener('resize', () => {
        resizeTriggered = true;
      });
    });
    cy.viewport(1024, 768);
    cy.window().trigger('resize');
  });

  it('Check resize event triggered', () => {
    cy.wrap().should(() => {
      expect(resizeTriggered).to.eq(true);
    });
  });

  it('Check timer resize is called', () => {
    cy.wrap().should(() => {
      expect(spyTimer).to.be.calledWith('');
    });
  });

  it('Check finish resize is called', () => {
    cy.wrap().should(() => {
      expect(spyFinish).to.be.calledWith(null);
    });
  });

  it('Check info resize is called', () => {
    cy.wrap().should(() => {
      expect(spyInfo).to.be.calledWith(null);
    });
  });

  it('Check settting resize is called', () => {
    cy.wrap().should(() => {
      expect(spySetting).to.be.calledWith(null);
    });
  });
});

// Check a 800 * 600 screen
describe('Check a 800 * 600 screen', { includeShadowDom: true }, () => {
  let resizeTriggered = false;
  let spy;

  beforeEach(() => {
    // only need to listen to timer, which will move up
    cy.window().then((win) => {
      spy = cy.spy(win.pomoTimer, 'changeTransform').as('callTimerResize');
    });
    cy.window().then((win) => {
      win.addEventListener('resize', () => {
        resizeTriggered = true;
      });
    });

    // run these tests as if in a desktop
    // browser with a 600 monitor
    cy.viewport(800, 600);
    cy.window().trigger('resize');
  });

  it('Check resize event triggered', () => {
    cy.wrap().should(() => {
      expect(resizeTriggered).to.eq(true);
    });
  });

  it('Check timer resize is called', () => {
    cy.wrap().should(() => {
      expect(spy).to.be.calledWith('translateY(-50px)');
    });
  });
});

// Check a 225 * 400 screen
describe('Check a 225 * 400 screen', { includeShadowDom: true }, () => {
  let resizeTriggered = false;
  let spyTimer;
  let spyFinish;
  let spyInfo;
  let spySetting;

  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a 225 * 400 monitor

    cy.window().then((win) => {
      spyTimer = cy.spy(win.pomoTimer, 'changeTransform').as('callTimerResize');
      spyFinish = cy.spy(win.pomoFinish, 'changeTransform').as('callFinishResize');
      spyInfo = cy.spy(win.pomoInfo, 'changeTransform').as('callFinishResize');
      spySetting = cy.spy(win.pomoSettings, 'changeTransform').as('callSettingResize');
    });
    cy.window().then((win) => {
      win.addEventListener('resize', () => {
        resizeTriggered = true;
      });
    });
    cy.viewport(225, 400);
    cy.window().trigger('resize');
  });

  it('Check resize event triggered', () => {
    cy.wrap().should(() => {
      expect(resizeTriggered).to.eq(true);
    });
  });

  it('Check timer resize is called', () => {
    cy.wrap().should(() => {
      expect(spyTimer).to.be.calledWith('translateY(-100px) scale(0.5) ');
    });
  });

  it('Check finish resize is called', () => {
    cy.wrap().should(() => {
      expect(spyFinish).to.be.calledWith('scale(0.5) translateX(75px)');
    });
  });

  it('Check info resize is called', () => {
    cy.wrap().should(() => {
      expect(spyInfo).to.be.calledWith('scale(0.5) translateX(75px)');
    });
  });

  it('Check settting resize is called', () => {
    cy.wrap().should(() => {
      expect(spySetting).to.be.calledWith(
        'scale(0.5) translateX(-75px)',
        'scale(0.5) translateX(-75px)',
        45);
    });
  });

  it('Check timer changeTransform called', () => {
    cy.get('.wrapper').then(($el) => {
      expect($el).to.have.css('transform', 'matrix(0.5, 0, 0, 0.5, 0, -100)');
    });
  });

  it('Check setting changeTransform called', () => {
    cy.get('#open-button').should('have.css', 'transform', 'matrix(0.5, 0, 0, 0.5, -37.5, 0)');
    cy.get('#open-button').click();
    cy.get('#settings.open').should('have.css', 'left', '-45px');
    cy.get('#settings.open').should('have.css', 'transform', 'matrix(0.5, 0, 0, 0.5, -37.5, 0)');
  });

  it('Check finish changeTransform called', () => {
    cy.get('#finish-button').then(($el) => {
      expect($el).to.have.css('transform', 'matrix(0.5, 0, 0, 0.5, 37.5, 0)');
    });
  });

  it('Check info changeTransform called', () => {
    cy.get('#info-button').then(($el) => {
      expect($el).to.have.css('transform', 'matrix(0.5, 0, 0, 0.5, 37.5, 0)');
    });
  });
});

// Check a iphoneX screen
describe('Check a iphoneX screen', { includeShadowDom: true }, () => {
  let resizeTriggered = false;
  let spyTimer;
  let spyFinish;
  let spyInfo;
  let spySetting;

  beforeEach(() => {
    // run these tests as if in a desktop
    // browser with a iphoneX monitor
    cy.window().then((win) => {
      spyTimer = cy.spy(win.pomoTimer, 'changeTransform').as('callTimerResize');
      spyFinish = cy.spy(win.pomoFinish, 'changeTransform').as('callFinishResize');
      spyInfo = cy.spy(win.pomoInfo, 'changeTransform').as('callFinishResize');
      spySetting = cy.spy(win.pomoSettings, 'changeTransform').as('callSettingResize');
    });
    cy.window().then((win) => {
      win.addEventListener('resize', () => {
        resizeTriggered = true;
      });
    });
    cy.viewport('iphone-x');
    cy.window().trigger('resize');
  });

  it('Check mobile resize event triggered', () => {
    cy.wrap().should(() => {
      expect(resizeTriggered).to.eq(true);
    });
  });

  it('Check mobile timer resize is called', () => {
    cy.wrap().should(() => {
        expect(spyTimer).to.be.calledWith(' scale(0.8333333333333334) ');
    });
  });

  it('Check mobile finish resize is called', () => {
    cy.wrap().should(() => {
      expect(spyFinish).to.be.calledWith('scale(0.8333333333333334) translateX(15px)');
    });
  });

  it('Check mobile info resize is called', () => {
    cy.wrap().should(() => {
      expect(spyInfo).to.be.calledWith('scale(0.8333333333333334) translateX(15px)');
    });
  });

  it('Check mobile settting resize is called', () => {
    cy.wrap().should(() => {
      expect(spySetting).to.be.calledWith(
        'scale(0.8333333333333334) translateX(-15px)',
        'scale(0.8333333333333334) translateX(-15px)',
        15);
    });
  });
});
