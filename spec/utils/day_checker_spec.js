import _ from 'lodash';
import checker from '../../src/utils/day_checker';

describe("checker", function() {
  it('should return true if on the same day', function() {
    let day1 = new Date(2015, 0, 18, 16, 44);
    let day2 = new Date(2015, 0, 18, 9, 2);

    expect(checker(day1, day2)).toBeTruthy();
  });

  it('should return false if not on the same day', function() {
    let day1 = new Date(2015, 0, 18, 16, 44);
    let day2 = new Date(2015, 0, 19, 16, 44);

    expect(checker(day1, day2)).toBeFalsy();
  });
});