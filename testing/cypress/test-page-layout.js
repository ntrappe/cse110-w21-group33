describe('Open Page', () => {
  it('Opens index.html', () => {
    cy.visit('./source/index.html');
  });
});

/* Verify that all elements are present */
describe('Find Timer Element with JS', () => {
  it("Get element ('Timer')", () => {
    cy.window().then((win) => {
      expect(win.pomoTimer).to.exist;
    });
  });
});

describe('Find Info Element with JS', () => {
  it("Get element ('Info')", () => {
    cy.window().then((win) => {
      expect(win.pomoInfo).to.exist;
    });
  });
});

describe('Find Finish Element with JS', () => {
  it("Get element ('Finish')", () => {
    cy.window().then((win) => {
      expect(win.pomoFinish).to.exist;
    });
  });
});

describe('Find Settings Element with JS', () => {
  it("Get element ('Settings')", () => {
    cy.window().then((win) => {
      expect(win.pomoSettings).to.exist;
    });
  });
});

describe('Verify element layout', { includeShadowDom: true }, () => {
  it('Get position', () => {
    cy.window().then((win) => {
      win.pomoTimer.setTimer(1, 'work');

      /* Coordinates for each element */
      const timerCoords = win.pomoTimer.getBoundingClientRect();
      const settingCoords = win.pomoSettings.getBoundingClientRect();
      const infoCoords = win.pomoInfo.getBoundingClientRect();
      const finishCoords = win.pomoFinish.getBoundingClientRect();

      /* Criteria for correct positions are relative to the total size of the window */
      const PARTITION = 4;
      const WIDTH = Cypress.config().viewportWidth;
      const HEIGHT = Cypress.config().viewportHeight;

      const LEFT_SIDE = WIDTH / PARTITION;
      const RIGHT_SIDE = WIDTH - WIDTH / PARTITION;

      const TOP_POS = HEIGHT / PARTITION;
      const BOTTOM_POS = HEIGHT - HEIGHT / PARTITION;

      /* Criteria for timer being centered is relative to other elements */
      const CENTER_LEFT = settingCoords.x + settingCoords.width;
      const CENTER_RIGHT = infoCoords.x;
      const CENTER_TOP = settingCoords.y + settingCoords.height;
      const CENTER_BOTTOM = finishCoords.y;

      /* Verify settings button is in top left corner */
      expect(settingCoords.x).to.be.below(LEFT_SIDE);
      expect(settingCoords.y).to.be.below(TOP_POS);

      /* Verify info button is in top right corner */
      expect(infoCoords.x).to.be.above(RIGHT_SIDE);
      expect(infoCoords.y).to.be.below(TOP_POS);

      /* Verify finish button is in bottom right corner */
      expect(finishCoords.x).to.be.above(RIGHT_SIDE);
      expect(finishCoords.y).to.be.above(BOTTOM_POS);

      /* Verify timer is centered between elements in the top and bottom areas */
      expect(timerCoords.x).to.be.within(CENTER_LEFT, CENTER_RIGHT);
      expect(timerCoords.y).to.be.within(CENTER_TOP, CENTER_BOTTOM);
    });
  });
});
