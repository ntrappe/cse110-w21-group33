describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

describe('Verify setDark colors for pomoInfo', { includeShadowDom: true }, () => {
  it('Check if pomoInfo exists', () => {
    cy.window().then((win) => {
      expect(win.pomoInfo).to.exist;
    });
  });

  it('Check setDark colors', () => {
    cy.window().then((win) => {
      win.pomoInfo.setDark(true);

      cy.get('#info-button').click();

      /* Verify colors of info button */
      cy.get('#info-button').should('have.css', 'background-color', 'rgb(34, 38, 44)');
      cy.get('#info-button').should('have.css', 'color', 'rgb(203, 209, 216)');
      cy.get('#info-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');

      /* Verify background colors of info modal */
      cy.get('#info-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#info-content').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    });
  });
});
