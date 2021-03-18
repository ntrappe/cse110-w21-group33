import * as storageHelper from '../../source/storage';

// Helper variable to set the local storage
const manualStorage = JSON.stringify({ work: 10, shortBreak: 0, longBreak: 0, interrupts: 0 });
// Helper variable to check the setDayCounts method
const storageValue = { interrupts: 5, longBreak: 2, shortBreak: 3, work: 15 };
const defaultStorageValue = { interrupts: 0, longBreak: 0, shortBreak: 0, work: 0 };

beforeEach(() => {
  localStorage.clear();
});

test('getDayCount without setDayCount', () => {
  expect(storageHelper.getDayCounts()).toStrictEqual(defaultStorageValue);
});

test('getDayCount for same day/month/year', () => {
  const currStorageValue = { interrupts: 0, longBreak: 0, shortBreak: 0, work: 10 };
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate());
  localStorage.setItem('pomodoroCount', manualStorage);
  expect(storageHelper.getDayCounts()).toStrictEqual(currStorageValue);
});

test('getDayCount for a new day', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate() - 1); // Previous date before current day
  localStorage.setItem('pomodoroCount', manualStorage);
  expect(storageHelper.getDayCounts()).toStrictEqual(defaultStorageValue);
});

test('getDayCount for a new Month', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth()); // Will be the month before current month
  localStorage.setItem('prevDay', date.getDate());
  localStorage.setItem('pomodoroCount', manualStorage);
  expect(storageHelper.getDayCounts()).toStrictEqual(defaultStorageValue);
});

test('getDayCount for a new Year', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear() - 1); // Year before current year
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate());
  localStorage.setItem('pomodoroCount', manualStorage);
  expect(storageHelper.getDayCounts()).toStrictEqual(defaultStorageValue);
});

test('setDayCount for the first time', () => {
  storageHelper.setDayCounts(15, 3, 2, 5);
  expect(storageHelper.getDayCounts()).toStrictEqual(storageValue);
});

test('setDayCount for same day/month/year', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate());
  localStorage.setItem('pomodoroCount', manualStorage);
  storageHelper.setDayCounts(15, 3, 2, 5);
  expect(storageHelper.getDayCounts()).toStrictEqual(storageValue);
});

test('setDayCount for a new day', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate() - 1); // Previous date before current day
  localStorage.setItem('pomodoroCount', manualStorage);
  storageHelper.setDayCounts(15, 3, 2, 5);
  expect(storageHelper.getDayCounts()).toStrictEqual(storageValue);
});

test('setDayCount for a new Month', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth()); // Month before current month
  localStorage.setItem('prevDay', date.getDate());
  localStorage.setItem('pomodoroCount', manualStorage);
  storageHelper.setDayCounts(15, 3, 2, 5);
  expect(storageHelper.getDayCounts()).toStrictEqual(storageValue);
});

test('setDayCount for a new Year', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear() - 1); // Year before current year
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate());
  localStorage.setItem('pomodoroCount', manualStorage);
  storageHelper.setDayCounts(15, 3, 2, 5);
  expect(storageHelper.getDayCounts()).toStrictEqual(storageValue);
});

test('getCalm without setCalm', () => {
  expect(storageHelper.getCalm()).toBe(false);
});

test('setCalm to be true', () => {
  storageHelper.setCalm(true);
  expect(storageHelper.getCalm()).toBe(true);
});

test('setCalm to be false', () => {
  storageHelper.setCalm(false);
  expect(storageHelper.getCalm()).toBe(false);
});

test('getVolume without setVolume', () => {
  expect(storageHelper.getVolume()).toBe(100);
});

test('setVolume to be 80', () => {
  storageHelper.setVolume(80);
  expect(storageHelper.getVolume()).toBe(80);
});

test('getSound without setSound', () => {
  expect(storageHelper.getSound()).toBe('./assets/audio/bike_chime.mp3');
});

test('setSound to be jingle', () => {
  storageHelper.setSound('jingle');
  expect(storageHelper.getSound()).toBe('jingle');
});

test('getDark without setDark', () => {
  expect(storageHelper.getDark()).toBe(true);
});

test('setDark to be true', () => {
  storageHelper.setDark(true);
  expect(storageHelper.getDark()).toBe(true);
});

test('setDark to be false', () => {
  storageHelper.setDark(false);
  expect(storageHelper.getDark()).toBe(false);
});

test('getWork without setWork', () => {
  expect(storageHelper.getWork()).toBe(25);
});

test('setWork to be 30', () => {
  storageHelper.setWork(30);
  expect(storageHelper.getWork()).toBe(30);
});

test('getShortBreak without setShortBreak', () => {
  expect(storageHelper.getShortBreak()).toBe(5);
});

test('setShortBreak to be 10', () => {
  storageHelper.setShortBreak(10);
  expect(storageHelper.getShortBreak()).toBe(10);
});

test('getLongBreak without setLongBreak', () => {
  expect(storageHelper.getLongBreak()).toBe(15);
});

test('setLongBreak to be 20', () => {
  storageHelper.setLongBreak(20);
  expect(storageHelper.getLongBreak()).toBe(20);
});

test('getAccessibility without setAccessbility', () => {
  expect(storageHelper.getAccessibility()).toBe(true);
});

test('setAccessbility to be true', () => {
  storageHelper.setAccessibility(true);
  expect(storageHelper.getAccessibility()).toBe(true);
});

test('setAccessbility to be false', () => {
  storageHelper.setAccessibility(false);
  expect(storageHelper.getAccessibility()).toBe(false);
});

test('getMode without setMode', () => {
  expect(storageHelper.getMode()).toBe('work');
});

test('getMode with work saved', () => {
  storageHelper.setMode('work');
  expect(storageHelper.getMode()).toBe('work');
});

test('getMode with short break saved', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate());
  storageHelper.setMode('short break');
  expect(storageHelper.getMode()).toBe('short break');
});

test('getMode with long break saved', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate());
  storageHelper.setMode('long break');
  expect(storageHelper.getMode()).toBe('long break');
});

test('getMode with long break saved and new day', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate() - 1); // Previous date before current day
  storageHelper.setMode('long break');
  expect(storageHelper.getMode()).toBe('work');
});
