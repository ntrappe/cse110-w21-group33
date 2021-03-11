describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/index.html')
    });
});

/* Starter Tests to find elements on page */

// Used for testing component visuals
// Remove this when the component has been implemented
describe('Find Info Element with ID', { includeShadowDom: true }, () => {
    it('Check for element (\'Info\')', () => {
        cy.get('p').then(($el) => {
            expect($el).to.contain('Info');
        });
    });
});

// Used for calling functions on the component
describe('Find Info Element with JS', () => {
    it('Get element (\'Info\')', () => {
        cy.window().then((win) => {
            expect(win.pomoInfo).to.exist;
        });
    });
});

/* Add your own tests here */