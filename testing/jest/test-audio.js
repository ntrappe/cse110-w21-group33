import * as audioHelper from "../../source/audio"

/* Test for enableSound */
describe('test enableSound', () => {

    test('enabled is false', () => {
        expect(audioHelper.enableSound(false)).toBe(false);
    });
    test('enabled is true', () => {
        expect(audioHelper.enableSound(true)).toBe(true);
    });
  
  });