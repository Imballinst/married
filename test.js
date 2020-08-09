const {
  WEDDING_DATE,
  calculate,
  startOfDay,
  appendZeros,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds
} = require('./date');

function assert(condition) {
  if (!condition) {
    throw new Error("Test doesn't pass");
  }
}

const describe = (_name, callback) => callback();

// Test cases.
describe('helper functions', () => {
  describe('days', () => {
    const oneDayAfter = new Date(2020, 6 /* July */, 13, 9, 43, 33);
    const twoDaysAfter = new Date(2020, 6 /* July */, 14, 9, 43, 33);

    assert(differenceInDays(WEDDING_DATE, oneDayAfter) === 1);
    assert(differenceInDays(WEDDING_DATE, twoDaysAfter) === 2);
  });

  // TODO(imballinst): infinite loop here.
  describe('days, startOf', () => {
    const oneDayAfter = new Date(2020, 6 /* July */, 13);
    const twoDaysAfter = new Date(2020, 6 /* July */, 14);

    assert(differenceInDays(WEDDING_DATE, oneDayAfter) === 0);
    assert(differenceInDays(WEDDING_DATE, twoDaysAfter) === 1);
  });

  // describe('weeks', () => {
  //   const oneWeekAfter = new Date(2020, 6 /* July */, 19, 9, 43, 33);
  //   const twoWeeksAfter = new Date(2020, 6 /* July */, 26, 9, 43, 33);
  // });

  // const oneMonthAfter = new Date(2020, 7 /* August */, 12, 9, 43, 33);
  // const twoMonthsAfter = new Date(2020, 8 /* September */, 12, 9, 43, 33);

  // const oneYearAfter = new Date(2021, 6 /* July */, 12, 9, 43, 33);
  // const twoYearsAfter = new Date(2022, 6 /* July */, 12, 9, 43, 33);

  // // Start of day.
  // const oneMonthAfterStartOfDay = new Date(2020, 7 /* August */, 12, 9, 43, 33);
});
