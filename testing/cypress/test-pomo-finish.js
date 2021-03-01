describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/index.html')
    });
});

/* Starter Tests to find elements on page */
describe('Find Finish Elements', { includeShadowDom: true }, () => {
    it('Get element (\'Finish\') via ID', () => {
        cy.find('p');
    });
});
/*
describe('Check Initial State of Elements', { includeShadowDom: true }, () => {
    it('Check that element says Finish', () => {
        cy.get('p').then(($el) => {
            expect($el).toBe.contain('Finish');
        });
    });
});*/

/* Add your own tests here */