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
describe('Test sidebar elements', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/source/index.html');
        cy.get('#openButton').click();
    });

    it('Sidebar opens when gear is pressed', { includeShadowDom: true }, () => {
        cy.get('#closeButton').click();
        cy.get('#openButton').click();

        cy.get('#settings')
        .then($el => {
            expect($el).to.have.attr('class', 'open');
        });
    });

    it('Sidebar closes when x is pressed', { includeShadowDom: true }, () => {
        cy.get('#closeButton').click();

        cy.get('#settings')
        .then($el => {
            expect($el).to.have.attr('class', 'close');
        });
    });

    it('Sidebar closes when clicking outside of sidebar', { includeShadowDom: true }, () => {
        cy.get('body').click();

        cy.get('#settings')
        .then($el => {
            expect($el).to.have.attr('class', 'close');
        });
    });    

    it('Volume input changes when slider changes', { includeShadowDom: true }, () => {
        cy.get('#volumeSlide').invoke('val', 20).trigger('input');

        cy.get('#volumeNumber')
        .then($el => {
            expect($el).to.have.value(20);
        })
    });

    it('Slider changes when volume input changes', { includeShadowDom: true }, () => {
        cy.get('#volumeNumber').clear().type('80');
    
        cy.get('#volumeSlide')
        .then($el => {
            expect($el).to.have.value(80);
        });
    });

});