describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/index.html')
    });
});

/* Starter Tests to find elements on page */

// Used for calling functions on the component
describe('Find Settings Element with JS', () => {
    it('Get element (\'Settings\')', () => {
        cy.window().then((win) => {
            expect(win.pomoSettings).to.exist;
        });
    });
});

/* Add your own tests here */

describe('Check slider functionality', { includeShadowDom: true }, () => {
    it('Volume of audio element changes when slider changes', () => {
        cy.get('#volume-slider').invoke('val', 33).trigger('input');
        cy.get('#alarm-sound').then(($el) => {
          expect($el).to.have.prop('volume', 0.33);
        });
    });
});

describe('setSound tests', { includeShadowDom: true }, () => {
    it('Sound source changes when setSound is called successfully', () => {
        cy.window().then((win) => {
            win.pomoAudio.setSound('https://dl.dropboxusercontent.com/s/1cdwpm3gca9mlo0/kick.mp3');
        });
        cy.get('#alarm-sound').then(($el) => {
          expect($el).to.have.attr('src', 'https://dl.dropboxusercontent.com/s/1cdwpm3gca9mlo0/kick.mp3');
        });
    });
});

