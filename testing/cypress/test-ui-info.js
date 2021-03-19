describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

function testUIInfoDark() {
  describe('Verify dark mode colors for pomoInfo', { includeShadowDom: true }, () => {
    it('Check if pomoInfo exists', () => {
      cy.window().then((win) => {
        expect(win.pomoInfo).to.exist;
      });
    });

    it('Check dark mode colors', () => {
      cy.get('#info-button').click();

      /* Verify colors of info buttons */
      cy.get('#info-button').should('have.css', 'background-color', 'rgb(34, 38, 44)');
      cy.get('#info-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');
      cy.get('#info-button').should('have.css', 'color', 'rgba(0, 0, 0, 0)');
      cy.get('#info-close-button').should('have.css', 'background-color', 'rgb(15, 17, 21)');
      cy.get('#info-close-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');
      cy.get('#info-close-button').should('have.css', 'color', 'rgb(203, 209, 216)');
      cy.get('#info-button-icon').then(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });

      /* Verify background colors of info modal */
      cy.get('#info-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#info-content').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
      cy.get('#info-content').should('have.css', 'border-bottom', '0px none rgb(139, 148, 158)');
      cy.get('#info-modal-content').should('have.css', 'background-color', 'rgb(13, 17, 23)');
      cy.get('#info-modal-content').should('have.css', 'border-color', 'rgb(48, 54, 61)');
    });

    it('Close info and reset', () => {
      cy.get('#info-close-button').click();
    });
  });
}

function testUIInfoLight(fromControl) {
  describe('Verify light mode colors for pomoInfo', { includeShadowDom: true }, () => {
    it('Check if pomoInfo exists', () => {
      cy.window().then((win) => {
        expect(win.pomoInfo).to.exist;
      });
    });

    if (!fromControl) {
      it('Toggle light mode', () => {
        cy.get('#settings-button').click();
        cy.get('#dark-slider').click();
        cy.get('#settings-close-button').click();
      });
    }

    it('Check light mode colors', () => {
      cy.get('#info-button').click();

      /* Verify colors of info buttons */
      cy.get('#info-button').should('have.css', 'background-color', 'rgb(229, 231, 234)');
      cy.get('#info-button').should('have.css', 'border-color', 'rgb(216, 219, 220)');
      cy.get('#info-button').should('have.css', 'color', 'rgb(36, 40, 44)');

      cy.get('#info-close-button').should('have.css', 'background-color', 'rgb(246, 248, 250)');
      cy.get('#info-close-button').should('have.css', 'border-color', 'rgb(200, 205, 211)');
      cy.get('#info-close-button').should('have.css', 'color', 'rgb(36, 41, 46)');

      /* Verify background colors of info modal */
      cy.get('#info-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#info-content').should('have.css', 'background-color', 'rgb(255, 255, 255)');
      cy.get('#info-content').should('have.css', 'border-bottom', '0px none rgb(36, 41, 46)');
      cy.get('#info-modal-content').should('have.css', 'background-color', 'rgb(255, 255, 255)');
      cy.get('#info-modal-content').should('have.css', 'border-color', 'rgb(48, 54, 61)');
    });

    it('Close info and reset', () => {
      cy.get('#info-close-button').click();

      if (!fromControl) {
        cy.get('#settings-button').click();
        cy.get('#dark-slider').click();
        cy.get('#settings-close-button').click();
      }
    });
  });
}

testUIInfoDark();
testUIInfoLight(false);
export { testUIInfoDark, testUIInfoLight };
