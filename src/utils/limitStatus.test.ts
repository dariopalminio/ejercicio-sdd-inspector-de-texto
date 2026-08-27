import { calculateLimitStatus } from './limitStatus';

describe('calculateLimitStatus', () => {
  it('returns "within" when the value is below the max', () => {
    expect(calculateLimitStatus({ value: 10, max: 100 })).toEqual({
      percentage: 10,
      status: 'within',
    });
  });

  it('returns "within" when the value equals the max', () => {
    expect(calculateLimitStatus({ value: 100, max: 100 })).toEqual({
      percentage: 100,
      status: 'within',
    });
  });

  it('returns "over" when the value exceeds the max', () => {
    expect(calculateLimitStatus({ value: 150, max: 100 })).toEqual({
      percentage: 150,
      status: 'over',
    });
  });

  it('rounds the percentage to the nearest integer', () => {
    expect(calculateLimitStatus({ value: 1, max: 3 })).toEqual({
      percentage: 33,
      status: 'within',
    });
  });

  it('returns 0% and "within" when both value and max are 0', () => {
    expect(calculateLimitStatus({ value: 0, max: 0 })).toEqual({
      percentage: 0,
      status: 'within',
    });
  });

  it('returns 100% and "over" when max is 0 but value is greater than 0', () => {
    expect(calculateLimitStatus({ value: 5, max: 0 })).toEqual({
      percentage: 100,
      status: 'over',
    });
  });
});
