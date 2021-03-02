describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/index.html')
    });
});

/* Starter Tests to find elements on page */
describe('Find Finish Elements', { includeShadowDom: true }, () => {
    beforeEach(() => {
        cy.visit('./source/index.html');
    });
    it('Get element finish button', () => {
        cy.get('#finishButton');
    });
    it('Get element close button', () => {
        cy.get('#closeButton');
    });
    it('Get lightbox title', () => {
        cy.get('#modalTitle');
    });
    it('Get element statistics panel', () => {
        cy.get('#statisticsPanel');
    });
});
describe('Check Initial State of Elements', { includeShadowDom: true }, () => {
    beforeEach(() => {
        cy.visit('./source/index.html');
    });
    it('Check that button labeled Statistics', () => {
        cy.get('#finishButton').then(($el) => {
            expect($el).to.contain('Statistics');
        });
    });
    it('Check that lightbox is not displayed initially', () => {
        cy.get('#modal').should('have.css', 'display', 'none');
    });
});

describe('Check Lightbox Controls', { includeShadowDom: true}, () => {
    beforeEach(() => {
        cy.visit('./source/index.html');
    });
    it('Check that finish button opens lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#modal').should('have.css', 'display', 'block');
    });
    it('Check that close button closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#closeButton').click().then(() => {
            cy.get('#modal').should('have.css', 'display', 'none');
        });
    });
    it('Check clicking top of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#modal').click('top');
        cy.get('#modal').should('have.css', 'display', 'none');
    });
    it('Check clicking top right of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#modal').click('topRight');
        cy.get('#modal').should('have.css', 'display', 'none');
    });
    it('Check clicking top left of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#modal').click('topLeft');
        cy.get('#modal').should('have.css', 'display', 'none');
    });
    it('Check clicking bottom of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#modal').click('bottom');
        cy.get('#modal').should('have.css', 'display', 'none');
    });
    it('Check clicking bottom right of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#modal').click('bottomRight');
        cy.get('#modal').should('have.css', 'display', 'none');
    });
    it('Check clicking bottom left of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#modal').click('bottomLeft');
        cy.get('#modal').should('have.css', 'display', 'none');
    });
    it('Check clicking left of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#modal').click('left');
        cy.get('#modal').should('have.css', 'display', 'none');
    });
    it('Check clicking right left of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#modal').click('right');
        cy.get('#modal').should('have.css', 'display', 'none');
    });
})

describe('Check Statistics Panel Elements', { includeShadowDom: true }, () => {
    it('Check statistics panel has all elements', () => {
        cy.visit('./source/index.html');
        // finishButton will invoke showModal(2, 1, 0, 50, 0);
        cy.get('#finishButton').click();
        cy.get('#statisticsPanel').then(($el) => {
            expect($el).to.contain('Pomodoro Completed: 2');
            expect($el).to.contain('Short Breaks: 1');
            expect($el).to.contain('Long Breaks: 0');
            expect($el).to.contain('Interrupted Session: 0');
            expect($el).to.contain('Total Minutes Working: 50');
        });
        cy.get('#modal').should('have.css', 'display', 'block');
    });

});


/* Add your own tests here */