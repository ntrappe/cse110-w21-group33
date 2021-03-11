describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

/* Starter Tests to find elements on page */

// Used for testing component visuals
// Remove this when the component has been implemented
describe('Find Finish Element with ID', { includeShadowDom: true }, () => {
  it("Check for element ('Finish')", () => {
    cy.get('p').then(($el) => {
      expect($el).to.contain('Finish');
    });
  });
});

// Used for calling functions on the component
describe('Find Finish Element with JS', () => {
  it("Get element ('Finish')", () => {
    cy.window().then((win) => {
      expect(win.pomoFinish).to.exist;
    });
  });
});

/* Add your own tests here */
