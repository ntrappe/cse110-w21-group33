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
        cy.get('#statisticsCloseButton');
    });
    it('Get lightbox title', () => {
        cy.get('#statisticsModalTitle');
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
        cy.get('#statisticsModal').should('have.css', 'display', 'none');
    });
});

describe('Check Lightbox Controls', { includeShadowDom: true}, () => {
    beforeEach(() => {
        cy.visit('./source/index.html');
    });
    it('Check that finish button opens lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#statisticsModal').should('have.css', 'display', 'block');
    });
    it('Check that close button closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#statisticsCloseButton').click().then(() => {
            cy.get('#statisticsModal').should('have.css', 'display', 'none');
        });
    });
    it('Check clicking top of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#statisticsModal').click('top');
        cy.get('#statisticsModal').should('have.css', 'display', 'none');
    });
    it('Check clicking top right of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#statisticsModal').click('topRight');
        cy.get('#statisticsModal').should('have.css', 'display', 'none');
    });
    it('Check clicking top left of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#statisticsModal').click('topLeft');
        cy.get('#statisticsModal').should('have.css', 'display', 'none');
    });
    it('Check clicking bottom of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#statisticsModal').click('bottom');
        cy.get('#statisticsModal').should('have.css', 'display', 'none');
    });
    it('Check clicking bottom right of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#statisticsModal').click('bottomRight');
        cy.get('#statisticsModal').should('have.css', 'display', 'none');
    });
    it('Check clicking bottom left of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#statisticsModal').click('bottomLeft');
        cy.get('#statisticsModal').should('have.css', 'display', 'none');
    });
    it('Check clicking left of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#statisticsModal').click('left');
        cy.get('#statisticsModal').should('have.css', 'display', 'none');
    });
    it('Check clicking right left of the modal closes lightbox', () => {
        cy.get('#finishButton').click();
        cy.get('#statisticsModal').click('right');
        cy.get('#statisticsModal').should('have.css', 'display', 'none');
    });
})

describe('Check Statistics Panel Elements With showModal()', { includeShadowDom: true }, () => {
    it('Check statistics panel has all elements', () => {
        cy.visit('./source/index.html');
        cy.window().then((win) => {
            win.pomoFinish.showModal(3, 2, 0, 0, 75);
        });
        cy.get('#statisticsPanel').then(($el) => {
            expect($el).to.contain('Pomodoro Completed: 3');
            expect($el).to.contain('Short Breaks: 2');
            expect($el).to.contain('Long Breaks: 0');
            expect($el).to.contain('Interrupted Session: 0');
            expect($el).to.contain('Total Minutes Working: 75');
        });
        cy.get('#statisticsModal').should('have.css', 'display', 'block');
    });
});


/* Add your own tests here */