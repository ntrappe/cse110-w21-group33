import { getDayCount, setDayCount, getCalm, setCalm, getVolume, setVolume, getSound, setSound, getDark, setDark, getWork, setWork, getShortBreak, setShortBreak, getLongBreak, setLongBreak } from '../../source/storage';

beforeEach(() => {
  localStorage.clear();
});

test('getDayCount without setDayCount', () => {
  expect(getDayCount()).toBe(0);
});

test('getDayCount for same day/month/year', () => {
  var date = new Date();
  localStorage.setItem('prevYear',date.getFullYear());  
  localStorage.setItem('prevMonth',date.getMonth()+1);
  localStorage.setItem('prevDay',date.getDate());
  localStorage.setItem('pomodoroCount',10);
  expect(getDayCount()).toBe(10);
});

test('getDayCount for a new day', () => {
  var date = new Date();
  localStorage.setItem('prevYear',date.getFullYear());  
  localStorage.setItem('prevMonth',date.getMonth()+1);
  localStorage.setItem('prevDay',1);
  localStorage.setItem('pomodoroCount',10);
  expect(getDayCount()).toBe(0);
});

test('getDayCount for a new Month', () => {
  var date = new Date();
  localStorage.setItem('prevYear',date.getFullYear());  
  localStorage.setItem('prevMonth',2);
  localStorage.setItem('prevDay',date.getDate());
  localStorage.setItem('pomodoroCount',10);
expect(getDayCount()).toBe(0);
});

test('getDayCount for a new Year', () => {
  var date = new Date();
  localStorage.setItem('prevYear',2020);  
  localStorage.setItem('prevMonth',date.getMonth()+1);
  localStorage.setItem('prevDay',date.getDate());
  localStorage.setItem('pomodoroCount',10);
  expect(getDayCount()).toBe(0);
});

test('setDayCount for the first time', () => {
  setDayCount(5);
  expect(getDayCount()).toBe(5);
});

test('setDayCount for same day/month/year', () => {
  var date = new Date();
  localStorage.setItem('prevYear',date.getFullYear());  
  localStorage.setItem('prevMonth',date.getMonth()+1);
  localStorage.setItem('prevDay',date.getDate());
  localStorage.setItem('pomodoroCount',10);
  setDayCount(5);
  expect(getDayCount()).toBe(15);
});

test('setDayCount for a new day', () => {
  var date = new Date();
  localStorage.setItem('prevYear',date.getFullYear());  
  localStorage.setItem('prevMonth',date.getMonth()+1);
  localStorage.setItem('prevDay',1);
  localStorage.setItem('pomodoroCount',10);
  setDayCount(5);
  expect(getDayCount()).toBe(5);
});

test('setDayCount for a new Month', () => {
  var date = new Date();
  localStorage.setItem('prevYear',date.getFullYear());  
  localStorage.setItem('prevMonth',2);
  localStorage.setItem('prevDay',date.getDate());
  localStorage.setItem('pomodoroCount',10);
  setDayCount(11);
  expect(getDayCount()).toBe(11);
});

test('setDayCount for a new Year', () => {
  var date = new Date();
  localStorage.setItem('prevYear',2020);  
  localStorage.setItem('prevMonth',date.getMonth()+1);
  localStorage.setItem('prevDay',date.getDate());
  localStorage.setItem('pomodoroCount',10);
  setDayCount(12);
  expect(getDayCount()).toBe(12);
});

test('setCalm to be true', () => {
    setCalm(true);
    expect(getCalm()).toBe(true);
  });

test('getCalm without setCalm', () => {
  expect(getCalm()).toBe(false);
}); 

test('setCalm to be true', () => {
  setCalm(true);
  expect(getCalm()).toBe(true);
});

test('setCalm to be false', () => {
  setCalm(false);
  expect(getCalm()).toBe(false);
});

test('getVolume without setVolume', () => {
  expect(getVolume()).toBe(100);
});

test('setVolume to be 80', () => {
  setVolume(80);
  expect(getVolume()).toBe(80);
});

test('getSound without setSound', () => {
  expect(getSound()).toBe('zapsplat_household_alarm_clock_old_fashioned_ring_very_short_44062.mp3');
});

test('setSound to be jingle', () => {
  setSound('jingle');
  expect(getSound()).toBe('jingle');
});

test('getDark without setDark', () => {
  expect(getDark()).toBe(false);
});

test('setDark to be true', () => {
  setDark(true);
  expect(getDark()).toBe(true);
});

test('setDark to be true', () => {
  setDark(false);
  expect(getDark()).toBe(false);
});

test('getWork without setWork', () => {
  expect(getWork()).toBe(25);
});

test('setWork to be 30', () => {
  setWork(30);
  expect(getWork()).toBe(30);
});

test('getShortBreak without setShortBreak', () => {
  expect(getShortBreak()).toBe(5);
});
  
test('setShortBreak to be 10', () => {
  setShortBreak(10);
  expect(getShortBreak()).toBe(10);
});

test('getLongBreak without setLongBreak', () => {
  expect(getLongBreak()).toBe(15);
});
    
test('setLongBreak to be 20', () => {
  setLongBreak(20);
  expect(getLongBreak()).toBe(20);
});