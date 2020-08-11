const {
  WEDDING_DATE,
  calculate,
  getNumberOfDaysInMonth,
  appendZeros
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
describe;
