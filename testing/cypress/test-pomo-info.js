describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/index.html')
    });
});

/* Starter Tests to find elements on page */
describe('Find Info Elements', { includeShadowDom: true }, () => {
    it('Get element (\'Info\') via ID', () => {
        cy.get('p');
    });
});
/*
describe('Check Initial State of Elements', { includeShadowDom: true }, () => {
    it('Check that element says Info', () => {
        cy.get('p').then(($el) => {
            expect($el).toBe.contain('Info');
        });
    });
});*/

/* Add your own tests here */