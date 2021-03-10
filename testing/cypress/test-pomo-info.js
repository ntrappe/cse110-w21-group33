describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

/* Starter Tests to find elements on page */
describe('Find Info Elements', { includeShadowDom: true }, () => {
  it("Get element ('Info')", () => {
    cy.get('p');
  });
});
describe('Check Initial State of Elements', { includeShadowDom: true }, () => {
  it('Check that element says Info', () => {
    cy.get('p').then(($el) => {
      expect($el).to.contain('Info');
    });
  });
});

/* Add your own tests here */
