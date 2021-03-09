describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/index.html')
    });
});

/* Starter Tests to find elements on page */

// Used for testing component visuals
// Remove this when the component has been implemented
describe('Find Finish Element with ID', { includeShadowDom: true }, () => {
    it('Check for element (\'Finish\')', () => {
        cy.get('#finishButton').then(($el) => {
            expect($el).to.contain('Finish');
        });
    });
});

describe('Check Statistics Panel Elements With showModal()', { includeShadowDom: true }, () => {
    it('Check statistics panel has all elements', () => {
        cy.visit('./source/index.html');
        cy.window().then((win) => {
            win.pomoFinish.showModal(3, 2, 0, 75, 0);
        });
        cy.get('#statistics-panel').then(($el) => {
            expect($el).to.contain('Pomodoro Completed: 3');
            expect($el).to.contain('Short Breaks: 2');
            expect($el).to.contain('Long Breaks: 0');
            expect($el).to.contain('Interrupted Session: 0');
            expect($el).to.contain('Total Minutes Working: 75');
        });
    });
});

/* Add your own tests here */