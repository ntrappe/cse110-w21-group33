describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

describe('Testing Settings with Audio', { includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('./source/index.html');
    cy.get('#settings-button').click();
  });

  it('Set Volume and check that audio.volume is changed', () => {
    cy.get('#volume-number').type('{selectall}{backspace}77', { force: true }).trigger('change');
    cy.get('#alarm-sound').then(($el) => {
      expect($el).to.have.prop('volume', 0.77);
    });
  });

  it('Set Sound Option and check that audio is changed', () => {
    cy.get('#sound-select').select('./assets/audio/small_bell.mp3');
    cy.get('#alarm-sound').then(($el) => {
      expect($el).to.have.attr('src', './assets/audio/small_bell.mp3');
    });
  });
});