describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

describe('Verify dark mode colors for pomoFinish', { includeShadowDom: true }, () => {
  it('Check if pomoFinish exists', () => {
    cy.window().then((win) => {
      expect(win.pomoFinish).to.exist;
    });
  });

  it('Check dark mode colors', () => {
    cy.window().then((win) => {
      win.pomoFinish.setDark(true);

      cy.get('#finish-button').click();

      /* Verify colors of finish button */
      cy.get('#finish-button').should('have.css', 'background-color', 'rgb(34, 38, 44)');
      cy.get('#finish-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');
      cy.get('#finish-button').should('have.css', 'color', 'rgba(0, 0, 0, 0)');

      /* Verify background colors of stats modal */
      cy.get('#statistics-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#statistics-modal-content').should('have.css', 'background-color', 'rgb(15, 17, 21)');
      cy.get('#statistics-modal-content').should('have.css', 'border-color', 'rgb(49, 54, 60)');
    });
  });
});

describe('Verify light mode colors for pomoFinish', { includeShadowDom: true }, () => {
  it('Check light mode colors', () => {
    cy.window().then((win) => {
      win.pomoFinish.setDark(false);

      /* Verify colors of finish button */
      cy.get('#finish-button').should('have.css', 'background-color', 'rgb(229, 231, 234)');
      cy.get('#finish-button').should('have.css', 'border-color', 'rgb(216, 219, 220)');
      cy.get('#finish-button').should('have.css', 'color', 'rgb(36, 40, 44)');

      /* Verify background colors of stats modal */
      cy.get('#statistics-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#statistics-modal-content').should('have.css', 'background-color', 'rgb(15, 17, 21)');
      cy.get('#statistics-modal-content').should('have.css', 'border-color', 'rgb(49, 54, 60)');
    });
  });
});
