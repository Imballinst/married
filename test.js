const { calculate } = require('./date');

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

// Clear the console.
console.clear();

// Test cases.
describe('calculate', () => {
  describe('seconds', () => {
    describe('August 12, 2020, 09:43:32', () => {
      const result = calculate(new Date(2020, 7 /* August */, 12, 9, 43, 32));

      assert(result.years, 0);
      assert(result.months, 0);
      assert(result.days, 30);
      assert(result.hours, 23);
      assert(result.minutes, 59);
      assert(result.seconds, 59);
    });

    describe('August 12, 2020, 09:43:33', () => {
      const result = calculate(new Date(2020, 7 /* August */, 12, 9, 43, 33));

      assert(result.years, 0);
      assert(result.months, 1);
      assert(result.days, 0);
      assert(result.hours, 0);
      assert(result.minutes, 0);
      assert(result.seconds, 0);
    });

    describe('August 12, 2020, 09:43:34', () => {
      const result = calculate(new Date(2020, 7 /* August */, 12, 9, 43, 34));

      assert(result.years, 0);
      assert(result.months, 1);
      assert(result.days, 0);
      assert(result.hours, 0);
      assert(result.minutes, 0);
      assert(result.seconds, 1);
    });
  });

  describe('minutes', () => {
    describe('August 12, 2020, 09:42:33', () => {
      const result = calculate(new Date(2020, 7 /* August */, 12, 9, 42, 33));

      assert(result.years, 0);
      assert(result.months, 0);
      assert(result.days, 30);
      assert(result.hours, 23);
      assert(result.minutes, 59);
      assert(result.seconds, 0);
    });

    describe('August 12, 2020, 09:43:33', () => {
      const result = calculate(new Date(2020, 7 /* August */, 12, 9, 43, 33));

      assert(result.years, 0);
      assert(result.months, 1);
      assert(result.days, 0);
      assert(result.hours, 0);
      assert(result.minutes, 0);
      assert(result.seconds, 0);
    });

    describe('August 12, 2020, 09:44:33', () => {
      const result = calculate(new Date(2020, 7 /* August */, 12, 9, 44, 33));

      assert(result.years, 0);
      assert(result.months, 1);
      assert(result.days, 0);
      assert(result.hours, 0);
      assert(result.minutes, 1);
      assert(result.seconds, 0);
    });
  });

  describe('hours', () => {
    describe('August 12, 2020, 08:43:33', () => {
      const result = calculate(new Date(2020, 7 /* August */, 12, 8, 43, 33));

      assert(result.years, 0);
      assert(result.months, 0);
      assert(result.days, 30);
      assert(result.hours, 23);
      assert(result.minutes, 0);
      assert(result.seconds, 0);
    });

    describe('August 12, 2020, 09:43:33', () => {
      const result = calculate(new Date(2020, 7 /* August */, 12, 9, 43, 33));

      assert(result.years, 0);
      assert(result.months, 1);
      assert(result.days, 0);
      assert(result.hours, 0);
      assert(result.minutes, 0);
      assert(result.seconds, 0);
    });

    describe('August 12, 2020, 10:43:33', () => {
      const result = calculate(new Date(2020, 7 /* August */, 12, 10, 43, 33));

      assert(result.years, 0);
      assert(result.months, 1);
      assert(result.days, 0);
      assert(result.hours, 1);
      assert(result.minutes, 0);
      assert(result.seconds, 0);
    });
  });

  describe('days', () => {
    describe('August 11, 2020, 09:43:33', () => {
      const result = calculate(new Date(2020, 7 /* August */, 11, 9, 43, 33));

      assert(result.years, 0);
      assert(result.months, 0);
      assert(result.days, 30);
      assert(result.hours, 0);
      assert(result.minutes, 0);
      assert(result.seconds, 0);
    });

    describe('August 12, 2020, 09:43:33', () => {
      const result = calculate(new Date(2020, 7 /* August */, 12, 9, 43, 33));

      assert(result.years, 0);
      assert(result.months, 1);
      assert(result.days, 0);
      assert(result.hours, 0);
      assert(result.minutes, 0);
      assert(result.seconds, 0);
    });

    describe('August 13, 2020, 09:43:33', () => {
      const result = calculate(new Date(2020, 7 /* August */, 13, 9, 43, 33));

      assert(result.years, 0);
      assert(result.months, 1);
      assert(result.days, 1);
      assert(result.hours, 0);
      assert(result.minutes, 0);
      assert(result.seconds, 0);
    });
  });

  describe('months', () => {
    describe('July 12, 2020, 09:43:33', () => {
      const result = calculate(new Date(2020, 6 /* July */, 12, 9, 43, 33));

      assert(result.years, 0);
      assert(result.months, 0);
      assert(result.days, 0);
      assert(result.hours, 0);
      assert(result.minutes, 0);
      assert(result.seconds, 0);
    });

    describe('August 12, 2020, 09:43:33', () => {
      const result = calculate(new Date(2020, 7 /* August */, 12, 9, 43, 33));

      assert(result.years, 0);
      assert(result.months, 1);
      assert(result.days, 0);
      assert(result.hours, 0);
      assert(result.minutes, 0);
      assert(result.seconds, 0);
    });

    describe('September 12, 2020, 09:43:33', () => {
      const result = calculate(
        new Date(2020, 8 /* September */, 12, 9, 43, 33)
      );

      assert(result.years, 0);
      assert(result.months, 2);
      assert(result.days, 0);
      assert(result.hours, 0);
      assert(result.minutes, 0);
      assert(result.seconds, 0);
    });
  });

  describe('years', () => {
    describe('July 12, 2021, 09:43:32', () => {
      const result = calculate(new Date(2021, 6 /* July */, 12, 9, 43, 32));

      assert(result.years, 0);
      assert(result.months, 11);
      assert(result.days, 30);
      assert(result.hours, 23);
      assert(result.minutes, 59);
      assert(result.seconds, 59);
    });

    describe('July 12, 2021, 09:43:33', () => {
      const result = calculate(new Date(2021, 6 /* July */, 12, 9, 43, 33));

      assert(result.years, 1);
      assert(result.months, 0);
      assert(result.days, 0);
      assert(result.hours, 0);
      assert(result.minutes, 0);
      assert(result.seconds, 0);
    });

    describe('July 12, 2021, 09:43:34', () => {
      const result = calculate(new Date(2021, 6 /* July */, 12, 9, 43, 34));

      assert(result.years, 1);
      assert(result.months, 0);
      assert(result.days, 0);
      assert(result.hours, 0);
      assert(result.minutes, 0);
      assert(result.seconds, 1);
    });
  });

  // stub.
  // describe('days', () => {
  //   describe('August 12, 2020, 09:43:33', () => {
  //     const result = calculate(new Date(2020, 7 /* August */, 12, 9, 43, 33));

  //     assert(result.years, 0);
  //     assert(result.months, 0);
  //     assert(result.days, 30);
  //     assert(result.hours, 23);
  //     assert(result.minutes, 0);
  //     assert(result.seconds, 0);
  //   });

  //   describe('August 12, 2020, 09:43:33', () => {
  //     const result = calculate(new Date(2020, 7 /* August */, 12, 9, 43, 33));

  //     assert(result.years, 0);
  //     assert(result.months, 1);
  //     assert(result.days, 0);
  //     assert(result.hours, 0);
  //     assert(result.minutes, 0);
  //     assert(result.seconds, 0);
  //   });

  //   describe('August 12, 2020, 09:43:33', () => {
  //     const result = calculate(new Date(2020, 7 /* August */, 12, 9, 43, 33));

  //     assert(result.years, 0);
  //     assert(result.months, 1);
  //     assert(result.days, 0);
  //     assert(result.hours, 1);
  //     assert(result.minutes, 0);
  //     assert(result.seconds, 0);
  //   });
  // });
});
