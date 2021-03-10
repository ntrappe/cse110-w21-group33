describe("Open Page", () => {
    it("Opens index.html", () => {
        cy.visit('./source/index.html')
    });
});

/* Starter Tests to find elements on page */

// Used for calling functions on the component
describe('Find Audio Element via ID', { includeShadowDom: true }, () => {
    it('Get element (\'Audio\')', () => {
        cy.get('#alarm-sound');
    });
});

// Used for calling functions on the component
describe('Find Audio Element with JS', () => {
    it('Get element (\'Audio\')', () => {
        cy.window().then((win) => {
            expect(win.pomoAudio).to.exist;
        });
    });
});

/* Add your own tests here */

describe('Enable/disable checking', { includeShadowDom: true }, () => {
    it('Volume enabled by default', () => {
        cy.window().then((win) => {
            expect(win.pomoAudio.enabled).to.be.true;
        });
    });

    it('Volume disabled with function', () => {
        cy.window().then((win) => {
            win.pomoAudio.disableSound();
            expect(win.pomoAudio.enabled).to.be.false;
        });
    });

    it('Volume re-enabled with function', () => {
        cy.window().then((win) => {
            win.pomoAudio.enableSound();
            expect(win.pomoAudio.enabled).to.be.true;
        });
    });
});

describe('Check play functionality', { includeShadowDom: true }, () => {
    it('Audio plays successfully', () => {
        cy.window().then((win) => {
            win.pomoAudio.playSound();
            
            cy.get('#alarm-sound').then(($el) => {
                expect($el[0].duration > 0 && !$el[0].paused && !$el[0].muted).to.be.true;
            });
        });
    });
});

describe('Test Setting Volume', { includeShadowDom: true }, () => {
    it('Test default value', () => {
        cy.get('#alarm-sound').then(($el) => {
            expect($el[0].volume).to.equal(1.0);
        });
    });

    it('Test too low value', () => {
        cy.window().then((win) => {
            win.pomoAudio.setVolume(-1);
            
            cy.get('#alarm-sound').then(($el) => {
                expect($el[0].volume).to.equal(1.0);
            });
        });
    });

    it('Test low value', () => {
        cy.window().then((win) => {
            win.pomoAudio.setVolume(1);
            
            cy.get('#alarm-sound').then(($el) => {
                expect($el[0].volume).to.equal(0.01);
            });
        });
    });

    it('Test medium value', () => {
        cy.window().then((win) => {
            win.pomoAudio.setVolume(50);
            
            cy.get('#alarm-sound').then(($el) => {
                expect($el[0].volume).to.equal(0.5);
            });
        });
    });

    it('Test high value', () => {
        cy.window().then((win) => {
            win.pomoAudio.setVolume(100);
            
            cy.get('#alarm-sound').then(($el) => {
                expect($el[0].volume).to.equal(1.0);
            });
        });
    });

    it('Test too high value', () => {
        cy.window().then((win) => {
            win.pomoAudio.setVolume(101);
            
            cy.get('#alarm-sound').then(($el) => {
                expect($el[0].volume).to.equal(1.0);
            });
        });
    });
});

describe('Test Setting Sound', { includeShadowDom: true }, () => {
    it('Test default value', () => {
        cy.get('#alarm-sound').then(($el) => {
            expect($el).to.have.attr('src', '/media/audio/bike_chime.mp3'); // SUBJECT TO CHANGE
        });
    });

    it('Test file value', () => {
        cy.window().then((win) => {
            win.pomoAudio.setSound('/test/location.mp3');
            
            cy.get('#alarm-sound').then(($el) => {
                expect($el).to.have.attr('src', '/test/location.mp3');
            });
        });
    });
});