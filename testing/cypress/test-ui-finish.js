describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

function testUIFinishDark() {
  describe('Verify dark mode colors for pomoFinish', { includeShadowDom: true }, () => {
    it('Check if pomoFinish exists', () => {
      cy.window().then((win) => {
        expect(win.pomoFinish).to.exist;
      });
    });

    it('Check dark mode colors', () => {
      cy.get('#finish-button').click();

      /* Verify colors of finish button */
      cy.get('#finish-button').should('have.css', 'background-color', 'rgb(34, 38, 44)');
      cy.get('#finish-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');
      cy.get('#finish-button').should('have.css', 'color', 'rgba(0, 0, 0, 0)');
      cy.get('#finish-button-icon').then(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });

      /* Verify background colors of stats modal */
      cy.get('#statistics-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#statistics-modal-content').should('have.css', 'background-color', 'rgb(15, 17, 21)');
      cy.get('#statistics-modal-content').should('have.css', 'border-color', 'rgb(49, 54, 60)');
    });

    it('Close stats and reset', () => {
      cy.get('#statistics-close-button').click();
    });
  });
}

function testUIFinishLight(fromControl) {
  describe('Verify light mode colors for pomoFinish', { includeShadowDom: true }, () => {
    it('Check if pomoFinish exists', () => {
      cy.window().then((win) => {
        expect(win.pomoFinish).to.exist;
      });
    });

    if (!fromControl) {
      it('Toggle light mode', () => {
        cy.get('#settings-button').click();
        cy.get('#dark-slider').click();
        cy.get('#close-button').click();
      });
    }

    it('Check light mode colors', () => {
      cy.get('#finish-button').click();

      /* Verify colors of finish button */
      cy.get('#finish-button').should('have.css', 'background-color', 'rgb(229, 231, 234)');
      cy.get('#finish-button').should('have.css', 'border-color', 'rgb(216, 219, 220)');
      cy.get('#finish-button').should('have.css', 'color', 'rgb(36, 40, 44)');

      /* Verify background colors of stats modal */
      cy.get('#statistics-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#statistics-modal-content').should('have.css', 'background-color', 'rgb(15, 17, 21)');
      cy.get('#statistics-modal-content').should('have.css', 'border-color', 'rgb(49, 54, 60)');
    });

    it('Close stats and reset', () => {
      cy.get('#statistics-close-button').click();

      if (!fromControl) {
        cy.get('#settings-button').click();
        cy.get('#dark-slider').click();
        cy.get('#close-button').click();
      }
    });
  });
}

testUIFinishDark();
testUIFinishLight(false);
export { testUIFinishDark, testUIFinishLight };
