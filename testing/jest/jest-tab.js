import * as tabHelper from "../../source/components/pomo-tab"

/* Test for setTab */
describe('test setTab without calm mode', () => {

  let tabText = {textContent: ""};

  /*
   * Test 10:01 and 01:10 to see if the function can handle padding 0
   * Also test for work/short break/long break
   */
  test('setTab 10:01 - work', () => {
    tabHelper.setCalm(false);
    tabHelper.setTab(601, "work", tabText);
    expect(tabText.textContent).toBe("10:01 - Work");
  });

  test('setTab 01:10 - Short Break', () => {
    tabHelper.setCalm(false);
    tabHelper.setTab(70, "short break", tabText);
    expect(tabText.textContent).toBe("01:10 - Short Break");
  });

  test('setTab 12:34 - Long Break', () => {
    tabHelper.setCalm(false);
    tabHelper.setTab(754, "long break", tabText);
    expect(tabText.textContent).toBe("12:34 - Long Break");
  });

  /* Test for default switch */
  test('setTab 12:34 - ', () => {
    tabHelper.setCalm(false);
    tabHelper.setTab(754, "long work", tabText);
    expect(tabText.textContent).toBe("12:34 - ");
  });
});

/* Test for setTab with calm mode */
describe('test setTab with calm mode', () => {

  let tabText = {textContent: ""};
  
  /*
   * Test 10:01 and 01:10 to see if the function can display ceiling value
   * Also test whole minute
   */
  test('setTab 10:01 - work', () => { 
    tabHelper.setCalm(true);
    tabHelper.setTab(601, "work", tabText);
    expect(tabText.textContent).toBe("11:00 - Work");
  });
  
  test('setTab 01:10 - Short Break', () => {  
    tabHelper.setCalm(true);
    tabHelper.setTab(70, "short break", tabText);
    expect(tabText.textContent).toBe("02:00 - Short Break");
  });
  
  test('setTab 12:00 - Long Break', () => {
    tabHelper.setCalm(true);
    tabHelper.setTab(720, "long break", tabText);
    expect(tabText.textContent).toBe("12:00 - Long Break");
  });
});

/* Test for setTab with calm mode */
describe('test setTab with default', () => {

  let tabText = {textContent: ""};
  
  /* Test if default will display the correct text */
  test('setTab default', () => {
    tabHelper.defaultTab(tabText);
    expect(tabText.textContent).toBe('Pomodoro Timer');
  });
});
