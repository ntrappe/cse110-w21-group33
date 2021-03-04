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
  });

});