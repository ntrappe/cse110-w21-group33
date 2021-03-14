describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

describe('Verify setDark colors for pomoFinish', { includeShadowDom: true }, () => {
  it('Check if pomoFinish exists', () => {
    cy.window().then((win) => {
      expect(win.pomoFinish).to.exist;
    });
  });

  it('Check setDark colors', () => {
    cy.window().then((win) => {
      win.pomoFinish.setDark(true);

      cy.get('#finish-button').click();

      /* Verify colors of info button */
      cy.get('#finish-button').should('have.css', 'background-color', 'rgb(34, 38, 44)');
      cy.get('#finish-button').should('have.css', 'color', 'rgb(203, 209, 216)');
      cy.get('#finish-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');

      /* Verify background colors of info modal */
      cy.get('#statistics-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#statistics-modal-content')
        .should('have.css', 'background-color', 'rgb(15, 17, 21)');
    });
  });
});