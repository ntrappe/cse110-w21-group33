describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

describe('Verify dark mode colors for pomoInfo', { includeShadowDom: true }, () => {
  it('Check if pomoInfo exists', () => {
    cy.window().then((win) => {
      expect(win.pomoInfo).to.exist;
    });
  });

  it('Check dark mode colors', () => {
    cy.window().then((win) => {
      win.pomoInfo.setDark(true);

      cy.get('#info-button').click();

      /* Verify colors of info buttons */
      cy.get('#info-button').should('have.css', 'background-color', 'rgb(34, 38, 44)');
      cy.get('#info-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');
      cy.get('#info-button').should('have.css', 'color', 'rgba(0, 0, 0, 0)');
      cy.get('#info-close-button').should('have.css', 'background-color', 'rgb(14, 17, 22)');
      cy.get('#info-close-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');
      cy.get('#info-close-button').should('have.css', 'color', 'rgb(203, 209, 216)');
      cy.get('#info-button-icon').then(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });

      /* Verify background colors of info modal */
      cy.get('#info-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#info-content').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
      cy.get('#info-content').should('have.css', 'border-bottom', '0px none rgb(203, 209, 216)');
      cy.get('#info-modal-content').should('have.css', 'background-color', 'rgb(23, 27, 33)');
      cy.get('#info-modal-content').should('have.css', 'border-color', 'rgb(49, 54, 60)');
    });
  });
});

describe('Verify light mode colors for pomoInfo', { includeShadowDom: true }, () => {
  it('Check light mode colors', () => {
    cy.window().then((win) => {
      win.pomoInfo.setDark(false);

      /* Verify colors of info buttons */
      cy.get('#info-button').should('have.css', 'background-color', 'rgb(229, 231, 234)');
      cy.get('#info-button').should('have.css', 'border-color', 'rgb(216, 219, 220)');
      cy.get('#info-button').should('have.css', 'color', 'rgb(36, 40, 44)');
      cy.get('#info-close-button').should('have.css', 'background-color', 'rgb(14, 17, 22)');
      cy.get('#info-close-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');
      cy.get('#info-close-button').should('have.css', 'color', 'rgb(203, 209, 216)');

      /* Verify background colors of info modal */
      cy.get('#info-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#info-content').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
      cy.get('#info-content').should('have.css', 'border-bottom', '0px none rgb(203, 209, 216)');
      cy.get('#info-modal-content').should('have.css', 'background-color', 'rgb(23, 27, 33)');
      cy.get('#info-modal-content').should('have.css', 'border-color', 'rgb(49, 54, 60)');
    });
  });
});
