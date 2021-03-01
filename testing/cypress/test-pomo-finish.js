describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/index.html')
    });
});

describe('Find Finish Elements', { includeShadowDom: true }, () => {
    it('Get mode text via ID', () => {
      cy.get('p');
    });
});