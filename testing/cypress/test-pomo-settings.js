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
    cy.visit('./source/index.html');
    cy.get('#openButton').click();
  });

  /* it('Sidebar opens when gear is pressed', { includeShadowDom: true }, () => {
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

  it('Audio volume changes when slider changes', {includeShadowDom: true}, () => {
    cy.get('#volumeSlide').invoke('val', 1).trigger('change');

    cy.get('#audioSound')
    .then($el => {
      expect($el).to.have.prop('volume', 0.01)
    });
  });
  
  it('Audio plays when slider changes', {includeShadowDom: true}, () => {
    cy.get('#volumeSlide').invoke('val', 75).trigger('change');

    cy.get('#audioSound')
    .then($el => {
      expect($el).to.have.prop('paused', false);
    });
  });

  it('Audio sound changes when dropdown option is selected', {includeShadowDom: true}, () => {
    cy.get('#soundSelect').select('rooster');

    cy.get('#audioSound')
    .then($el => {
      expect($el).to.have.attr('src', '/media/audio/rooster.mp3');
    });
  });

  it('Audio plays when dropdown option is selected', {includeShadowDom: true}, () => {
    cy.get('#soundSelect').select('rooster');

    cy.get('#audioSound')
    .then($el => {
      expect($el).to.have.prop('paused', false);
    }); 
  });*/

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

  it('changing settings fires appropriate events', {includeShadowDom: true}, () => {
    cy.get('#pomo-settings').then($el => {
      return new Cypress.Promise(resolve => {
        const onVolumeSet = () => {
          console.log('hello');
          expect(e.detail.volume()).to.be(20);
          $el[0].removeEventListener('volumeSet', onVolumeSet);
          resolve();
        };
        $el[0].addEventListener('volumeSet', onVolumeSet);
        cy.get('#volumeNumber').clear().type('20');
        cy.get('#volumeNumber').trigger('change');
      });
    });

  })
});
