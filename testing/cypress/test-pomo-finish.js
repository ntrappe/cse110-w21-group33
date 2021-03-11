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
        cy.get('#finish-button');
    });
    it('Get element close button', () => {
        cy.get('#statistics-close-button');
    });
    it('Get lightbox title', () => {
        cy.get('#statistics-modal-title');
    });
    it('Get element statistics panel', () => {
        cy.get('#statistics-panel');
    });
});
describe('Check Initial State of Elements', { includeShadowDom: true }, () => {
    beforeEach(() => {
        cy.visit('./source/index.html');
    });
    it('Check that button labeled Statistics', () => {
        cy.get('#finish-button').then(($el) => {
            expect($el).to.contain('Statistics');
        });
    });
    it('Check that lightbox is not displayed initially', () => {
        cy.get('#statistics-modal').should('have.css', 'display', 'none');
    });
});

describe('Check Lightbox Controls', { includeShadowDom: true}, () => {
    beforeEach(() => {
        cy.visit('./source/index.html');
    });
    it('Check that finish button opens lightbox and background is right color', () => {
        cy.get('#finish-button').click();
        cy.get('#statistics-modal').should('have.css', 'display', 'block');
        cy.get('#statistics-modal').should('have.css', 'background-color')
        .and('eq', 'rgba(0, 0, 0, 0.5)');
    });
    it('Check that close button closes lightbox', () => {
        cy.get('#finish-button').click();
        cy.get('#statistics-close-button').click().then(() => {
            cy.get('#statistics-modal').should('have.css', 'display', 'none');
        });
    });
    it('Check clicking top of the modal closes lightbox', () => {
        cy.get('#finish-button').click();
        cy.get('#statistics-modal').click('top');
        cy.get('#statistics-modal').should('have.css', 'display', 'none');
    });
    it('Check clicking top right of the modal closes lightbox', () => {
        cy.get('#finish-button').click();
        cy.get('#statistics-modal').click('topRight');
        cy.get('#statistics-modal').should('have.css', 'display', 'none');
    });
    it('Check clicking top left of the modal closes lightbox', () => {
        cy.get('#finish-button').click();
        cy.get('#statistics-modal').click('topLeft');
        cy.get('#statistics-modal').should('have.css', 'display', 'none');
    });
    it('Check clicking bottom of the modal closes lightbox', () => {
        cy.get('#finish-button').click();
        cy.get('#statistics-modal').click('bottom');
        cy.get('#statistics-modal').should('have.css', 'display', 'none');
    });
    it('Check clicking bottom right of the modal closes lightbox', () => {
        cy.get('#finish-button').click();
        cy.get('#statistics-modal').click('bottomRight');
        cy.get('#statistics-modal').should('have.css', 'display', 'none');
    });
    it('Check clicking bottom left of the modal closes lightbox', () => {
        cy.get('#finish-button').click();
        cy.get('#statistics-modal').click('bottomLeft');
        cy.get('#statistics-modal').should('have.css', 'display', 'none');
    });
    it('Check clicking left of the modal closes lightbox', () => {
        cy.get('#finish-button').click();
        cy.get('#statistics-modal').click('left');
        cy.get('#statistics-modal').should('have.css', 'display', 'none');
    });
    it('Check clicking right left of the modal closes lightbox', () => {
        cy.get('#finish-button').click();
        cy.get('#statistics-modal').click('right');
        cy.get('#statistics-modal').should('have.css', 'display', 'none');
    });
})

describe('Check Statistics Panel Elements With showModal()', { includeShadowDom: true }, () => {
    it('Check statistics panel has all elements', () => {
        cy.visit('./source/index.html');
        cy.window().then((win) => {
            win.pomoFinish.showModal(3, 2, 0, 0, 75);
        });
        cy.get('#statistics-panel').then(($el) => {
            expect($el).to.contain('Pomodoro Completed: 3');
            expect($el).to.contain('Short Breaks: 2');
            expect($el).to.contain('Long Breaks: 0');
            expect($el).to.contain('Interrupted Session: 0');
            expect($el).to.contain('Total Minutes Working: 75');
        });
        cy.get('#statistics-modal').should('have.css', 'display', 'block');
    });
});


/* Add your own tests here */