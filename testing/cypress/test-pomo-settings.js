describe("Open Page", () => {
  it("Opens index.html", () => {
    cy.visit('./source/index.html')
  });
});

/* Starter tests to find elements on page */
describe('Find Settings Elements', { includeShadowDom: true }, () => {
  it('Get element (\'Settings\')', () => {
    cy.get('label');
  });
});

describe('Check Initial State of Elements', { includeShadowDom: true }, () => {
  it('Check that element says Settings', () => {
    cy.get('h1').then(($el) => {
      expect($el).to.contain('Settings');
    });
  });
});

/* Add your own tests here */
describe('Test sidebar elements', () => {
  beforeEach(() => {
    cy.visit('./source');
    cy.get('#openButton').click();
  });

  it('Sidebar opens when gear is pressed', { includeShadowDom: true }, () => {
    cy.get('#closeButton').click();
    cy.get('#openButton').click();

    cy.get('#settings')
    .then($el => {
      expect($el).to.have.attr('class', 'open');
    });
  });

  it('Sidebar closes when x is pressed', { includeShadowDom: true }, () => {
    cy.get('#closeButton').click();

    cy.get('#settings')
    .then($el => {
      expect($el).to.have.attr('class', 'close');
    });
  });

  it('Sidebar closes when clicking outside of sidebar', { includeShadowDom: true }, () => {
    cy.get('body').click();

    cy.get('#settings')
    .then($el => {
      expect($el).to.have.attr('class', 'close');
    });
  });    

  it('Volume input changes when slider changes', { includeShadowDom: true }, () => {
    cy.get('#volumeSlide').invoke('val', 20).trigger('change');

    cy.get('#volumeNumber')
    .then($el => {
      expect($el).to.have.value(20);
    });
  });

  it('Slider changes when volume input changes', { includeShadowDom: true }, () => {
    cy.get('#volumeNumber').clear({force: true}).type('80', {force: true}).trigger('change');

    cy.get('#volumeSlide')
    .then($el => {
      expect($el).to.have.value(80);
    });
  });

  it('Values are set when calling loadSettings()', {includeShadowDom: true}, () => {
    //loadSettings()
    cy.window().then((win) => {
      win.pomoSettings.loadSettings(true, 10, 'rooster', true, 20, 10, 20);
      expect(win.pomoSettings.work).to.eq(20);
      expect(win.pomoSettings.shortBreak).to.eq(10);
      expect(win.pomoSettings.longBreak).to.eq(20);
      expect(win.pomoSettings.volume).to.eq(10);
      expect(win.pomoSettings.sound).to.eq('rooster');
      expect(win.pomoSettings.calm).to.eq(true);
      expect(win.pomoSettings.dark).to.eq(true);
      //work
      cy.get('#workMinutesNumber')
      .then($el => {
        expect($el).to.have.value(20);
      });
      //short Break
      cy.get('#shortBreakMinutesNumber')
      .then($el => {
        expect($el).to.have.value(10);
      });
      //long Break
      cy.get('#longBreakMinutesNumber')
      .then($el => {
        expect($el).to.have.value(20);
      });
      //volume
      cy.get('#volumeNumber')
      .then($el => {
        expect($el).to.have.value(10);
      });
      cy.get('#volumeSlide')
      .then($el => {
        expect($el).to.have.value(10);
      });
      //sound
      cy.get('#soundSelect')
      .then($el => {
        expect($el).to.have.value('rooster');
      })
      //calm
      cy.get('#calm_mode')
      .then($el => {
        expect($el[0].style.display).to.eq('block');
      });
      //dark
      cy.get('#dark_mode')
      .then($el => {
        expect($el[0].style.display).to.eq('block');
      });
    });
  });

  it('disableSettings() disables settings button', {includeShadowDom: true}, () => {
    cy.get('#openButton')
    .then($el => {
      $el.disabled = true;
    });
    cy.window().then((win) => {
      win.pomoSettings.disableSettings();
    });
    cy.get('#openButton')
    .then($el => {
      expect($el).to.have.attr('disabled');
    });
  });

  it('endableSettings() enables settings button', {includeShadowDom: true}, () => {
    cy.get('#openButton')
    .then($el => {
      $el.disabled = false;
    });
    cy.window().then((win) => {
      win.pomoSettings.enableSettings();
    });
    cy.get('#openButton')
    .then($el => {
      expect($el).to.not.have.attr('disabled');
    });
  });

  it('changing volumeSlide fires appropriate events', {includeShadowDom: true}, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then($el => {
        const onVolumeSet = (e) => {
          expect(e.detail.volume()).to.eq('20');
          $el[0].removeEventListener('volumeSet', onVolumeSet);
          resolve();
        };
        $el[0].addEventListener('volumeSet', onVolumeSet);
        cy.get('#volumeSlide').invoke('val', 20).trigger('change');
      });
    });
    cy.wrap(eventPromise);
  });

   it('changing volumeNumber fires appropriate events', {includeShadowDom: true}, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then($el => {
        const onVolumeSet = (e) => {
          expect(e.detail.volume()).to.eq('20');
          $el[0].removeEventListener('volumeSet', onVolumeSet);
          resolve();
        };
        $el[0].addEventListener('volumeSet', onVolumeSet);
        cy.get('#volumeNumber').type('{selectall}{backspace}20', {force: true}).trigger('change');
      });
    });
    cy.wrap(eventPromise);
  }); 

  it('changing soundSelect fires appropriate events', {includeShadowDom: true}, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then($el => {
        const onSoundSet = (e) => {
          expect(e.detail.sound()).to.eq('rooster');
          $el[0].removeEventListener('soundSet', onSoundSet);
          resolve();
        };
        $el[0].addEventListener('soundSet', onSoundSet);
        cy.get('#soundSelect').select('rooster');
      });
    });
    cy.wrap(eventPromise);
  });

   it('changing calmSwitch fires appropriate events', {includeShadowDom: true}, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then($el => {
        const onCalmSet = (e) => {
          expect(e.detail.calm()).to.eq(true);
          $el[0].removeEventListener('calmSet', onCalmSet);
          resolve();
        };
        $el[0].addEventListener('calmSet', onCalmSet);
        cy.window().then((win) => {
          win.window.calmMode.setOn();
        })
      });
    });
    cy.wrap(eventPromise);
  }); 

  it('changing darkSwitch fires appropriate events', {includeShadowDom: true}, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then($el => {
        const onDarkSet = (e) => {
          expect(e.detail.dark()).to.eq(true);
          $el[0].removeEventListener('darkSet', onDarkSet);
          resolve();
        };
        $el[0].addEventListener('darkSet', onDarkSet);
        cy.window().then((win) => {
          win.window.darkMode.setOn();
        })
      });
    });
    cy.wrap(eventPromise);
  }); 

   it('changing workMinuteNumber fires appropriate events', {includeShadowDom: true}, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then($el => {
        const onWorkSet = (e) => {
          expect(e.detail.work()).to.eq(20);
          $el[0].removeEventListener('workSet', onWorkSet);
          resolve();
        };
        $el[0].addEventListener('workSet', onWorkSet);
        cy.get('#workMinutesNumber').type('{selectall}{backspace}20', {force: true}).trigger('change');
      });
    });
    cy.wrap(eventPromise);
  }); 

  it('changing shortBreakMinutesNumber fires appropriate events', {includeShadowDom: true}, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then($el => {
        const onShortBreakSet = (e) => {
          expect(e.detail.shortBreak()).to.eq(20);
          $el[0].removeEventListener('shortBreakSet', onShortBreakSet);
          resolve();
        };
        $el[0].addEventListener('shortBreakSet', onShortBreakSet);
        cy.get('#shortBreakMinutesNumber').type('{selectall}{backspace}20', {force: true}).trigger('change');
      });
    });
    cy.wrap(eventPromise);
  }); 

  it('changing longBreakMinutesNumber fires appropriate events', {includeShadowDom: true}, () => {
    const eventPromise = new Cypress.Promise((resolve) => {
      cy.get('#pomo-settings').then($el => {
        const onLongBreakSet = (e) => {
          expect(e.detail.longBreak()).to.eq(20);
          $el[0].removeEventListener('longBreakSet', onLongBreakSet);
          resolve();
        };
        $el[0].addEventListener('longBreakSet', onLongBreakSet);
        cy.get('#longBreakMinutesNumber').type('{selectall}{backspace}20', {force: true}).trigger('change');
      });
    });
    cy.wrap(eventPromise);
  }); 
});
