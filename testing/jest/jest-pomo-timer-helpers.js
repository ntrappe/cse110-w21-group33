import * as pomoHelper from '../../source/components/pomo-timer/pomo-timer-helpers';

/* Test for function display */
describe('test display', () => {
  /* A fake element with attribute textContent */
  const timerText = { textContent: '' };

  /* Test 10:01 and 01:10 to see if the function can handle padding 0 */
  test('display 10:01', () => {
    pomoHelper.display(601, timerText, false);
    expect(timerText.textContent).toBe('10:01');
  });

  test('display 01:10', () => {
    pomoHelper.display(70, timerText, false);
    expect(timerText.textContent).toBe('01:10');
  });
});

/* Test for function set */
describe('test setTime', () => {
  /* Test for abover or below max and min */
  test('set 0 and 60', () => {
    expect(pomoHelper.setTime(0)).toBe(120);
    expect(pomoHelper.setTime(61)).toBe(120);
  });

  /* Test for acceptable value */
  test('set 10', () => {
    expect(pomoHelper.setTime(10)).toBe(600);
  });
});

/* Test for function setStartButton */
describe('test setStartButton', () => {
  /* A fake element with attribute innerHTML */
  const timerButton = { innerHTML: '' };

  test('setStartButton', () => {
    pomoHelper.setStartButton(timerButton);
    expect(timerButton.innerHTML).toBe('Start');
  });
});

/* Test for function setResetButton */
describe('test setResetButton', () => {
  /* A fake element with attribute innerHTML */
  const timerButton = { innerHTML: '' };

  test('setResetButton', () => {
    pomoHelper.setResetButton(timerButton);
    expect(timerButton.innerHTML).toBe('Reset');
  });
});

/* Test for function initProgess */
describe('test initProgess', () => {
  test('initProgess', () => {
    const output = pomoHelper.initProgess();

    /* Verify progress container contains all elements in expected order */
    expect(output.length).toBe(5);
    expect(output[0].getAttribute('class')).toBe('progress-container');

    /* Verify that squares and spaces are in right order */
    expect(output[0].children[0]).toBe(output[1]);
    expect(output[0].children[2]).toBe(output[2]);
    expect(output[0].children[4]).toBe(output[3]);
    expect(output[0].children[6]).toBe(output[4]);

    expect(output[0].children[1].getAttribute('class')).toBe('space');
    expect(output[0].children[3].getAttribute('class')).toBe('space');
    expect(output[0].children[5].getAttribute('class')).toBe('space');

    /* Verify that progress squares are initally off */
    expect(output[1].getAttribute('id')).toBe('square1');
    expect(output[2].getAttribute('id')).toBe('square2');
    expect(output[3].getAttribute('id')).toBe('square3');
    expect(output[4].getAttribute('id')).toBe('square4');

    expect(output[1].getAttribute('class')).toBe('square-off');
    expect(output[2].getAttribute('class')).toBe('square-off');
    expect(output[3].getAttribute('class')).toBe('square-off');
    expect(output[4].getAttribute('class')).toBe('square-off');
  });
});

/* Test for function setProgressHelper */
describe('test setProgressHelper', () => {
  /* Get square elemets */
  const output = pomoHelper.initProgess();

  test('setProgressHelper', () => {
    /* Set progress bar to 1/4, 2/4, 3/4, and 4/4 and verify correct squares are on */
    pomoHelper.setProgressHelper(1, output[1], output[2], output[3], output[4]);
    expect(output[1].getAttribute('class')).toBe('square-on');
    expect(output[2].getAttribute('class')).toBe('square-off');
    expect(output[3].getAttribute('class')).toBe('square-off');
    expect(output[4].getAttribute('class')).toBe('square-off');

    pomoHelper.setProgressHelper(2, output[1], output[2], output[3], output[4]);
    expect(output[1].getAttribute('class')).toBe('square-on');
    expect(output[2].getAttribute('class')).toBe('square-on');
    expect(output[3].getAttribute('class')).toBe('square-off');
    expect(output[4].getAttribute('class')).toBe('square-off');

    pomoHelper.setProgressHelper(3, output[1], output[2], output[3], output[4]);
    expect(output[1].getAttribute('class')).toBe('square-on');
    expect(output[2].getAttribute('class')).toBe('square-on');
    expect(output[3].getAttribute('class')).toBe('square-on');
    expect(output[4].getAttribute('class')).toBe('square-off');

    pomoHelper.setProgressHelper(4, output[1], output[2], output[3], output[4]);
    expect(output[1].getAttribute('class')).toBe('square-on');
    expect(output[2].getAttribute('class')).toBe('square-on');
    expect(output[3].getAttribute('class')).toBe('square-on');
    expect(output[4].getAttribute('class')).toBe('square-on');
  });

  test('setProgressHelper abnormal input', () => {
    pomoHelper.setProgressHelper(0, output[1], output[2], output[3], output[4]);
    expect(output[1].getAttribute('class')).toBe('square-off');
    expect(output[2].getAttribute('class')).toBe('square-off');
    expect(output[3].getAttribute('class')).toBe('square-off');
    expect(output[4].getAttribute('class')).toBe('square-off');
  });
});
