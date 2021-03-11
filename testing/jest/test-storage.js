import * as storageHelper from '../../source/storage';

beforeEach(() => {
  localStorage.clear();
});

test('getDayCount without setDayCount', () => {
  expect(getDayCount()).toBe(0);
});

test('getDayCount for same day/month/year', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate());
  localStorage.setItem('pomodoroCount', 10);
  expect(storageHelper.getDayCount()).toBe(10);
});

test('getDayCount for a new day', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate() - 1); // Previous date before current day
  localStorage.setItem('pomodoroCount', 10);
  expect(storageHelper.getDayCount()).toBe(0);
});

test('getDayCount for a new Month', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth()); // Will be the month before current month
  localStorage.setItem('prevDay', date.getDate());
  localStorage.setItem('pomodoroCount', 10);
  expect(storageHelper.getDayCount()).toBe(0);
});

test('getDayCount for a new Year', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear() - 1); // Year before current year
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate());
  localStorage.setItem('pomodoroCount', 10);
  expect(storageHelper.getDayCount()).toBe(0);
});

test('setDayCount for the first time', () => {
  setDayCount(5);
  expect(getDayCount()).toBe(5);
});

test('setDayCount for same day/month/year', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate());
  localStorage.setItem('pomodoroCount', 10);
  storageHelper.setDayCount(5);
  expect(storageHelper.getDayCount()).toBe(15);
});

test('setDayCount for a new day', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate() - 1); // Previous date before current day
  localStorage.setItem('pomodoroCount', 10);
  storageHelper.setDayCount(5);
  expect(storageHelper.getDayCount()).toBe(5);
});

test('setDayCount for a new Month', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear());
  localStorage.setItem('prevMonth', date.getMonth()); // Month before current month
  localStorage.setItem('prevDay', date.getDate());
  localStorage.setItem('pomodoroCount', 10);
  storageHelper.setDayCount(11);
  expect(storageHelper.getDayCount()).toBe(11);
});

test('setDayCount for a new Year', () => {
  const date = new Date();
  localStorage.setItem('prevYear', date.getFullYear() - 1); // Year before current year
  localStorage.setItem('prevMonth', date.getMonth() + 1);
  localStorage.setItem('prevDay', date.getDate());
  localStorage.setItem('pomodoroCount', 10);
  storageHelper.setDayCount(12);
  expect(storageHelper.getDayCount()).toBe(12);
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
  expect(storageHelper.getSound()).toBe(
    'zapsplat_household_alarm_clock_old_fashioned_ring_very_short_44062.mp3');
});

test('setSound to be jingle', () => {
  sstorageHelper.etSound('jingle');
  expect(storageHelper.getSound()).toBe('jingle');
});

test('getDark without setDark', () => {
  expect(storageHelper.getDark()).toBe(false);
});

test('setDark to be true', () => {
  storageHelper.setDark(true);
  expect(storageHelper.getDark()).toBe(true);
});

test('setDark to be true', () => {
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
