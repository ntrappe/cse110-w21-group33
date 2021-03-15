describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});
  
describe('Verify setDark colors for pomoSettings', { includeShadowDom: true }, () => {
  it('Check if pomoSettings exists', () => {
    cy.window().then((win) => {
      expect(win.pomoSettings).to.exist;
    });
  });

  it('Check settings title', () => {
    cy.window().then((win) => {
      cy.get('#open-button').click();

      cy.get('#settings-title').then(($title) => {
        expect($title[0].textContent).to.eq('Settings');
      });
    });
  });

  it('Check setDark colors', () => {
    cy.window().then((win) => {
      win.pomoSettings.setDark(true);

      /* Verify colors of settings buttons */
      cy.get('#open-button').should('have.css', 'background-color', 'rgb(15, 17, 21)');
      cy.get('#open-button').should('have.css', 'color', 'rgb(49, 54, 60)');
      cy.get('#close-button').should('have.css', 'background-color', 'rgb(15, 17, 21)');
      cy.get('#close-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');

      /* Verify background colors of settings sidebar */
      cy.get('#settings-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#settings').should('have.css', 'background-color', 'rgb(19, 21, 27)');

      cy.get('#work-number').should('have.css', 'background-color', 'rgb(13, 17, 23)');
      cy.get('#short-break-number').should('have.css', 'background-color', 'rgb(13, 17, 23)');
      cy.get('#long-break-number').should('have.css', 'background-color', 'rgb(13, 17, 23)');
      cy.get('#volume-number').should('have.css', 'background-color', 'rgb(13, 17, 23)');

      cy.get('#sound-select').should('have.css', 'background-color', 'rgb(13, 17, 23)');
      cy.get('#volume-slide').should('have.css', 'background-color', 'rgb(22, 27, 34)');

      /* Verify colors of toggle switches */
      cy.get('#busy-mode.off-mode').should('have.css', 'color', 'rgb(139, 148, 158)');
      cy.get('#busy-mode.off-mode').should('have.css', 'display', 'block');
      
      cy.get('#calm-mode.on-mode').should('have.css', 'color', 'rgb(121, 208, 113)');
      cy.get('#calm-mode.on-mode').should('have.css', 'display', 'none');

      cy.get('#light-mode.off-mode').should('have.css', 'color', 'rgb(139, 148, 158)');
      cy.get('#light-mode.off-mode').should('have.css', 'display', 'block');
      
      cy.get('#dark-mode.on-mode').should('have.css', 'color', 'rgb(121, 208, 113)');
      cy.get('#dark-mode.on-mode').should('have.css', 'display', 'none');

      cy.get('#accessible-mode.on-mode').should('have.css', 'color', 'rgb(121, 208, 113)');
      cy.get('#accessible-mode.on-mode').should('have.css', 'display', 'block');

      cy.get('#inaccessible-mode.off-mode').should('have.css', 'color', 'rgb(139, 148, 158)');
      cy.get('#inaccessible-mode.off-mode').should('have.css', 'display', 'none');
    });
  });

  it('Verify toggle switch UI change', () => {
    cy.get('#calm-slider').click();
    cy.get('#dark-slider').click();
    cy.get('#accessible-slider').click();

    cy.get('#calm-mode.on-mode').should('have.css', 'display', 'block');
    cy.get('#dark-mode.on-mode').should('have.css', 'display', 'block');
    cy.get('#inaccessible-mode.off-mode').should('have.css', 'display', 'block');

    cy.get('#busy-mode.off-mode').should('have.css', 'display', 'none');
    cy.get('#light-mode.off-mode').should('have.css', 'display', 'none');
    cy.get('#accessible-mode.on-mode').should('have.css', 'display', 'none');
  });
});
