describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

/* Starter Tests to find elements on page */

// Used for testing component visuals
// Remove this when the component has been implemented
describe('Find Settings Element with ID', { includeShadowDom: true }, () => {
  it("Check for element ('Settings')", () => {
    cy.get('p').then(($el) => {
      expect($el).to.contain('Settings');
    });
  });
});

// Used for calling functions on the component
describe('Find Settings Element with JS', () => {
  it("Get element ('Settings')", () => {
    cy.window().then((win) => {
      expect(win.pomoSettings).to.exist;
    });
  });
});

/* Add your own tests here */
