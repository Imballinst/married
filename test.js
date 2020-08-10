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

function assert(a, b) {
  if (a !== b) {
    throw new Error(`Test doesn't pass, ${a} does not equal to ${b}.`);
  } else {
    console.info(`✅ | Test successful: ${a} === ${b}.`);
  }
}

const describe = (name, callback) => {
  console.info(name);
  callback();
};

// Test cases.
describe('difference of days', () => {
  describe('days', () => {
    const oneDayAfter = new Date(2020, 6 /* July */, 13, 9, 43, 33);
    const twoDaysAfter = new Date(2020, 6 /* July */, 14, 9, 43, 33);

    assert(differenceInDays(WEDDING_DATE, oneDayAfter), 1);
    assert(differenceInDays(WEDDING_DATE, twoDaysAfter), 2);
  });

  describe('days, startOf', () => {
    const oneDayAfter = new Date(2020, 6 /* July */, 13);
    const twoDaysAfter = new Date(2020, 6 /* July */, 14);

    assert(differenceInDays(WEDDING_DATE, oneDayAfter), 0);
    assert(differenceInDays(WEDDING_DATE, twoDaysAfter), 1);
  });

  describe('weeks', () => {
    const oneWeekAfter = new Date(2020, 6 /* July */, 19, 9, 43, 33);
    const twoWeeksAfter = new Date(2020, 6 /* July */, 26, 9, 43, 33);

    assert(differenceInDays(WEDDING_DATE, oneWeekAfter), 7);
    assert(differenceInDays(WEDDING_DATE, twoWeeksAfter), 14);
  });

  describe('weeks, startOf', () => {
    const oneWeekAfter = new Date(2020, 6 /* July */, 19);
    const twoWeeksAfter = new Date(2020, 6 /* July */, 26);

    assert(differenceInDays(WEDDING_DATE, oneWeekAfter), 6);
    assert(differenceInDays(WEDDING_DATE, twoWeeksAfter), 13);
  });

  describe('months', () => {
    const oneMonthAfter = new Date(2020, 7 /* August */, 12, 9, 43, 33);
    const twoMonthsAfter = new Date(2020, 8 /* September */, 12, 9, 43, 33);

    assert(differenceInDays(WEDDING_DATE, oneMonthAfter), 0);
    assert(differenceInDays(WEDDING_DATE, twoMonthsAfter), 0);
  });

  describe('months, startOf', () => {
    const oneMonthAfter = new Date(2020, 7 /* August */, 12);
    const twoMonthsAfter = new Date(2020, 8 /* September */, 12);

    assert(differenceInDays(WEDDING_DATE, oneMonthAfter), 30);
    assert(differenceInDays(WEDDING_DATE, twoMonthsAfter), 30);
  });

  describe('years', () => {
    const oneYearAfter = new Date(2021, 6 /* July */, 12, 9, 43, 33);
    const twoYearsAfter = new Date(2022, 6 /* July */, 12, 9, 43, 33);

    assert(differenceInDays(WEDDING_DATE, oneYearAfter), 0);
    assert(differenceInDays(WEDDING_DATE, twoYearsAfter), 0);
  });

  describe('years, startOf', () => {
    const oneYearAfter = new Date(2021, 7 /* July */, 12);
    const twoYearsAfter = new Date(2022, 8 /* July */, 12);

    assert(differenceInDays(WEDDING_DATE, oneYearAfter), 30);
    assert(differenceInDays(WEDDING_DATE, twoYearsAfter), 30);
  });
});
