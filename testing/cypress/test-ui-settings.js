describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

function testUISettingsDark() {
  describe('Verify dark mode colors for pomoSettings', { includeShadowDom: true }, () => {
    it('Check if pomoSettings exists', () => {
      cy.window().then((win) => {
        expect(win.pomoSettings).to.exist;
      });
    });

    it('Check settings title', () => {
      cy.get('#settings-button').click();
      cy.get('#settings-title').then(($title) => {
        expect($title[0].textContent).to.eq('Settings');
      });
    });

    it('Check dark mode colors', () => {
      /* Verify colors of settings buttons */
      cy.get('#settings-button').should('have.css', 'background-color', 'rgb(34, 38, 44)');
      cy.get('#settings-button').should('have.css', 'color', 'rgba(0, 0, 0, 0)');
      cy.get('#close-button').should('have.css', 'background-color', 'rgb(15, 17, 21)');
      cy.get('#close-button').should('have.css', 'border-color', 'rgb(49, 54, 60)');
      cy.get('#settings-button-icon').then(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });

      /* Verify background colors of settings sidebar */
      cy.get('#settings-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#settings').should('have.css', 'background-color', 'rgb(19, 21, 27)');

      cy.get('#work-number').should('have.css', 'background-color', 'rgb(13, 17, 23)');
      cy.get('#work-number').should('have.css', 'border-color', 'rgb(48, 54, 61)');
      cy.get('#work-number').should('have.css', 'color', 'rgb(139, 148, 158)');
      cy.get('#short-break-number').should('have.css', 'background-color', 'rgb(13, 17, 23)');
      cy.get('#short-break-number').should('have.css', 'border-color', 'rgb(48, 54, 61)');
      cy.get('#short-break-number').should('have.css', 'color', 'rgb(139, 148, 158)');
      cy.get('#long-break-number').should('have.css', 'background-color', 'rgb(13, 17, 23)');
      cy.get('#long-break-number').should('have.css', 'border-color', 'rgb(48, 54, 61)');
      cy.get('#long-break-number').should('have.css', 'color', 'rgb(139, 148, 158)');
      cy.get('#volume-number').should('have.css', 'background-color', 'rgb(13, 17, 23)');
      cy.get('#volume-number').should('have.css', 'border-color', 'rgb(48, 54, 61)');
      cy.get('#volume-number').should('have.css', 'color', 'rgb(139, 148, 158)');

      cy.get('#sound-select').should('have.css', 'background-color', 'rgb(13, 17, 23)');
      cy.get('#sound-select').should('have.css', 'border-color', 'rgb(48, 54, 61)');
      cy.get('#sound-select').should('have.css', 'color', 'rgb(139, 148, 158)');
      cy.get('#volume-slide').should('have.css', 'background-color', 'rgb(22, 27, 34)');

      /* Verify colors of toggle switches */
      cy.get('#busy-mode.off-mode').should('have.css', 'color', 'rgb(139, 148, 158)');
      cy.get('#busy-mode.off-mode').should('have.css', 'display', 'block');

      cy.get('#calm-mode.on-mode').should('have.css', 'color', 'rgb(121, 208, 113)');
      cy.get('#calm-mode.on-mode').should('have.css', 'display', 'none');

      cy.get('#light-mode.off-mode').should('have.css', 'color', 'rgb(139, 148, 158)');
      cy.get('#light-mode.off-mode').should('have.css', 'display', 'none');

      cy.get('#dark-mode.on-mode').should('have.css', 'color', 'rgb(121, 208, 113)');
      cy.get('#dark-mode.on-mode').should('have.css', 'display', 'block');

      cy.get('#accessible-mode.on-mode').should('have.css', 'color', 'rgb(121, 208, 113)');
      cy.get('#accessible-mode.on-mode').should('have.css', 'display', 'block');

      cy.get('#inaccessible-mode.off-mode').should('have.css', 'color', 'rgb(139, 148, 158)');
      cy.get('#inaccessible-mode.off-mode').should('have.css', 'display', 'none');
    });

    it('Verify toggle switch UI change', () => {
      cy.get('#calm-slider').click();
      cy.get('#dark-slider').click();
      cy.get('#accessible-slider').click();

      cy.get('#calm-mode.on-mode').should('have.css', 'display', 'block');
      cy.get('#light-mode.off-mode').should('have.css', 'display', 'block');
      cy.get('#inaccessible-mode.off-mode').should('have.css', 'display', 'block');

      cy.get('#busy-mode.off-mode').should('have.css', 'display', 'none');
      cy.get('#dark-mode.on-mode').should('have.css', 'display', 'none');
      cy.get('#accessible-mode.on-mode').should('have.css', 'display', 'none');
    });

    it('Close settings and reset', () => {
      cy.get('#calm-slider').click();
      cy.get('#dark-slider').click();
      cy.get('#accessible-slider').click();
      cy.get('#close-button').click();
    });
  });
}

function testUISettingsLight(fromControl) {
  describe('Verify light mode colors for pomoSettings', { includeShadowDom: true }, () => {
    it('Check settings title', () => {
      cy.get('#settings-button').click();
      cy.get('#settings-title').then(($title) => {
        expect($title[0].textContent).to.eq('Settings');
      });
    });

    if (!fromControl) {
      it('Toggle light mode', () => {
        cy.get('#dark-slider').click();
      });
    }

    it('Check light mode colors', () => {
      /* Verify colors of settings buttons */
      cy.get('#settings-button').should('have.css', 'background-color', 'rgb(229, 231, 234)');
      cy.get('#settings-button').should('have.css', 'color', 'rgba(0, 0, 0, 0)');
      cy.get('#close-button').should('have.css', 'background-color', 'rgb(255, 255, 255)');
      cy.get('#close-button').should('have.css', 'border-color', 'rgb(218, 219, 220)');

      /* Verify background colors of settings sidebar */
      cy.get('#settings-modal').should('have.css', 'background-color', 'rgba(0, 0, 0, 0.5)');
      cy.get('#settings').should('have.css', 'background-color', 'rgb(250, 251, 252)');

      cy.get('#work-number').should('have.css', 'background-color', 'rgb(229, 232, 234)');
      cy.get('#work-number').should('have.css', 'border-color', 'rgb(218, 219, 220)');
      cy.get('#work-number').should('have.css', 'color', 'rgb(35, 39, 44)');
      cy.get('#short-break-number').should('have.css', 'background-color', 'rgb(229, 232, 234)');
      cy.get('#short-break-number').should('have.css', 'border-color', 'rgb(218, 219, 220)');
      cy.get('#short-break-number').should('have.css', 'color', 'rgb(35, 39, 44)');
      cy.get('#long-break-number').should('have.css', 'background-color', 'rgb(229, 232, 234)');
      cy.get('#long-break-number').should('have.css', 'border-color', 'rgb(218, 219, 220)');
      cy.get('#long-break-number').should('have.css', 'color', 'rgb(35, 39, 44)');
      cy.get('#volume-number').should('have.css', 'background-color', 'rgb(229, 232, 234)');
      cy.get('#volume-number').should('have.css', 'border-color', 'rgb(229, 232, 234)');
      cy.get('#volume-number').should('have.css', 'color', 'rgb(35, 39, 44)');

      cy.get('#sound-select').should('have.css', 'background-color', 'rgb(229, 232, 234)');
      cy.get('#sound-select').should('have.css', 'border-color', 'rgb(218, 219, 220)');
      cy.get('#sound-select').should('have.css', 'color', 'rgb(35, 39, 44)');
      cy.get('#volume-slide').should('have.css', 'background-color', 'rgb(255, 255, 255)');

      cy.get('#busy-mode.off-mode').should('have.css', 'display', 'block');
      cy.get('#light-mode.off-mode').should('have.css', 'display', 'block');
      cy.get('#accessible-mode.on-mode').should('have.css', 'display', 'block');

      cy.get('#calm-mode.on-mode').should('have.css', 'display', 'none');
      cy.get('#dark-mode.on-mode').should('have.css', 'display', 'none');
      cy.get('#inaccessible-mode.off-mode').should('have.css', 'display', 'none');

      /* Verify colors of toggle switches */
      cy.get('#busy-mode.off-mode').should('have.css', 'color', 'rgb(35, 39, 44)');
      cy.get('#calm-mode.on-mode').should('have.css', 'color', 'rgb(255, 255, 255)');

      cy.get('#light-mode.off-mode').should('have.css', 'color', 'rgb(35, 39, 44)');
      cy.get('#dark-mode.on-mode').should('have.css', 'color', 'rgb(255, 255, 255)');

      cy.get('#accessible-mode.on-mode').should('have.css', 'color', 'rgb(255, 255, 255)');
      cy.get('#inaccessible-mode.off-mode').should('have.css', 'color', 'rgb(35, 39, 44)');

      cy.get('#calm-slider').click();
      cy.get('#accessible-slider').click();
      cy.get('#dark-slider').click();
    });

    it('Verify toggle switch UI change', () => {
      cy.get('#calm-mode.on-mode').should('have.css', 'display', 'block');
      cy.get('#dark-mode.on-mode').should('have.css', 'display', 'block');
      cy.get('#inaccessible-mode.off-mode').should('have.css', 'display', 'block');

      cy.get('#busy-mode.off-mode').should('have.css', 'display', 'none');
      cy.get('#light-mode.off-mode').should('have.css', 'display', 'none');
      cy.get('#accessible-mode.on-mode').should('have.css', 'display', 'none');

      /* Verify colors of toggle switches */
      cy.get('#busy-mode.off-mode').should('have.css', 'color', 'rgb(139, 148, 158)');
      cy.get('#calm-mode.on-mode').should('have.css', 'color', 'rgb(121, 208, 113)');

      cy.get('#light-mode.off-mode').should('have.css', 'color', 'rgb(139, 148, 158)');
      cy.get('#dark-mode.on-mode').should('have.css', 'color', 'rgb(121, 208, 113)');

      cy.get('#accessible-mode.on-mode').should('have.css', 'color', 'rgb(121, 208, 113)');
      cy.get('#inaccessible-mode.off-mode').should('have.css', 'color', 'rgb(139, 148, 158)');

      cy.get('#calm-slider').click();
      cy.get('#accessible-slider').click();
      cy.get('#dark-slider').click();
    });

    it('Close settings and reset', () => {
      if (!fromControl) {
        cy.get('#dark-slider').click();
      }

      cy.get('#close-button').click();
    });
  });
}

testUISettingsDark();
testUISettingsLight(false);
export { testUISettingsDark, testUISettingsLight };
