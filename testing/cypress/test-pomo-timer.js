describe("Open Page", () => {
  it("Opens index.html", () => {
      cy.visit('./source/index.html')
  });
});

describe('Find Timer Elements', { includeShadowDom: true }, () => {
  it('Get mode text via ID', () => {
    cy.get('#mode');
  });

  it('Get timer text via class', () => {
    cy.get('.time');
  });

  it('Get toggle button via ID', () => {
    cy.get('#button');
  });
});

describe('Check Initial State of Elements', { includeShadowDom: true }, () => {
  it('Mode should be \'Work\'', () => {
    cy.get('#mode').then(($el) => {
      expect($el).to.contain('WORK');
    });
  });

  it('Button should be \'Start\'', () => {
    cy.get('#button').then(($el) => {
      expect($el).to.contain('Start');
    });
  });
});
/*
describe('Basic Button Toggles', { includeShadowDom: true }, () => {
  it('Button toggles when Start clicked', () => {
    cy.get('#button').click();
    cy.get('#button').then(($el) => {
      expect($el).to.have.attr('class', 'reset');
    });
  });

  it('Button toggles when Reset clicked', () => {
    cy.get('#button').click();
    cy.get('#button').then(($el) => {
      expect($el).to.have.attr('class', 'start');
    });
  });
});*/