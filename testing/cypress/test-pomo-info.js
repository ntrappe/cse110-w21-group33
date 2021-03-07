describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/index.html')
    });
});

/* Tests to check if all elements exists in the shadow DOM */
describe('Find Elements with ID', { includeShadowDom: true }, () => {
    it('Check for element (\'Info\')', () => {
        cy.get('#infoButton').then(($el) => {
            expect($el).to.contain('Info');
        });
    });
    it('Check for close button', () => {
        cy.get('#infoCloseButton').then(($el) => {
            expect($el).to.exist;
        });
    });
    it('Check for info content', () => {
        cy.get('#infoContent').then(($el) => {
            expect($el).to.exist; // at least has a space
        });
    });
});

describe('Check The Initial State of Component pomo-info', { includeShadowDom: true }, () => {
    it('Check that the lightbox is invisible', () => {
        cy.get('#infoModal').should('have.css', 'display', 'none')
    });
    it('Check that the info button is enabled', () => {
        cy.get('#infoButton').should('not.be.disabled');
    });
});

describe('Check The Enabling/Disabling Info Button', { includeShadowDom: true}, () => {
    it('Check that the button can be disabled', () => {
        cy.window().then((win) => {
            win.pomoInfo.disableInfo();
            cy.get('#infoButton').should('be.disabled');
        });
    });
    it('Check that the button can be enabled', () => {
        cy.window().then((win) => {
            win.pomoInfo.enableInfo();
            cy.get('#infoButton').should('not.be.disabled');
        });
    });
})

describe('Check Ligthbox Controls', { includeShadowDom: true }, () => {
    beforeEach(() => {
        cy.visit('./source/index.html');
    });

    it('Check that Info button opens lightbox', () => {
        cy.get('#infoButton').click();
        cy.get('#infoModal').should('have.css', 'display', 'block');
        cy.get('#infoModal').should('have.css', 'background-color')
        .and('eq', 'rgba(0, 0, 0, 0.5)');
    });

    it('Check that close button closes lightbox', () => {
        cy.get('#infoButton').click();
        cy.get('#infoCloseButton').click().then(() => {
            cy.get('#infoModal').should('have.css', 'display', 'none');
        });
    });
    it('Check clicking top of the modal closes lightbox', () => {
        cy.get('#infoButton').click();
        cy.get('#infoModal').click('top');
        cy.get('#infoModal').should('have.css', 'display', 'none');
    });
    it('Check clicking top right of the modal closes lightbox', () => {
        cy.get('#infoButton').click();
        cy.get('#infoModal').click('topRight');
        cy.get('#infoModal').should('have.css', 'display', 'none');
    });
    it('Check clicking top left of the modal closes lightbox', () => {
        cy.get('#infoButton').click();
        cy.get('#infoModal').click('topLeft');
        cy.get('#infoModal').should('have.css', 'display', 'none');
    });
    it('Check clicking bottom of the modal closes lightbox', () => {
        cy.get('#infoButton').click();
        cy.get('#infoModal').click('bottom');
        cy.get('#infoModal').should('have.css', 'display', 'none');
    });
    it('Check clicking bottom right of the modal closes lightbox', () => {
        cy.get('#infoButton').click();
        cy.get('#infoModal').click('bottomRight');
        cy.get('#infoModal').should('have.css', 'display', 'none');
    });
    it('Check clicking bottom left of the modal closes lightbox', () => {
        cy.get('#infoButton').click();
        cy.get('#infoModal').click('bottomLeft');
        cy.get('#infoModal').should('have.css', 'display', 'none');
    });
    it('Check clicking left of the modal closes lightbox', () => {
        cy.get('#infoButton').click();
        cy.get('#infoModal').click('left');
        cy.get('#infoModal').should('have.css', 'display', 'none');
    });
    it('Check clicking right left of the modal closes lightbox', () => {
        cy.get('#infoButton').click();
        cy.get('#infoModal').click('right');
        cy.get('#infoModal').should('have.css', 'display', 'none');
    });
});

/* Add your own tests here */