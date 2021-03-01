describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/index.html')
    });
});

/* Starter Tests to find elements on page */
describe('Find Settings Elements', { includeShadowDom: true }, () => {
    it('Get element (\'Settings\')', () => {
        cy.get('p');
    });
});
describe('Check Initial State of Elements', { includeShadowDom: true }, () => {
    it('Check that element says Settings', () => {
        cy.get('p').then(($el) => {
            expect($el).to.contain('Settings');
        });
    });
});

/* Add your own tests here */