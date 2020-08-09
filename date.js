// Constants.
const ONE_MINUTE_IN_SECONDS = 60;
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 60;
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24;
const ONE_DAY_IN_MILLISECONDS = ONE_DAY_IN_SECONDS * 1000;
// From Instagram tag: `<time class="_1o9PC Nzb55" datetime="2020-07-12T03:04:06.000Z" title="Jul 12, 2020">July 12</time>`.
// Instagram datetime post: 2020-07-12T03:04:06.000Z.
// Time-stamp the "ijab qabul" was done: 39:21/59:54 -- so there is 20 mins and 33 secs to go.
// Add the datetime to GMT+7, 10:04:06.
// Subtract the datetime with 20 mins and 33 secs -- 09:43:33.
const WEDDING_DATE = new Date(2020, 6 /* July */, 12, 9, 43, 33);

module.exports = {
  // Export the constants, too.
  WEDDING_DATE,
  // Export the functions.
  calculate,
  startOfDay,
  appendZeros,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds
};

function calculate() {
  const currentDate = new Date();

  const years = differenceInYears(WEDDING_DATE, currentDate);
  const months = differenceInMonths(WEDDING_DATE, currentDate);
  const days = differenceInDays(WEDDING_DATE, currentDate);
  const hours = differenceInHours(WEDDING_DATE, currentDate);
  const minutes = differenceInMinutes(WEDDING_DATE, currentDate);
  const seconds = differenceInSeconds(WEDDING_DATE, currentDate);

  // Fill into the divs.
  const yearsDiv = document.getElementById('years');
  const monthsDiv = document.getElementById('months');
  const daysDiv = document.getElementById('days');
  const hoursDiv = document.getElementById('hours');
  const minutesDiv = document.getElementById('minutes');
  const secondsDiv = document.getElementById('seconds');

  yearsDiv.innerHTML = appendZeros(years);
  monthsDiv.innerHTML = appendZeros(months);
  daysDiv.innerHTML = appendZeros(days);
  hoursDiv.innerHTML = appendZeros(hours);
  minutesDiv.innerHTML = appendZeros(minutes);
  secondsDiv.innerHTML = appendZeros(seconds);
}

// Helper functions.
function startOfDay(date) {
  const newDate = new Date(date);

  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
}

function appendZeros(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return `${number}`;
}

function differenceInYears(date1, date2) {
  return Math.abs(date1.getFullYear() - date2.getFullYear());
}

function differenceInMonths(date1, date2) {
  const diffInYears = differenceInYears(date1, date2);
  let diff;

  if (diffInYears === 0) {
    diff = Math.abs(date1.getMonth() - date2.getMonth());
  } else {
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    const monthDiff = month1 - month2;

    if (monthDiff < 0) {
      // `date2` is later month(s) in different year.
      diff = 12 - monthDiff;
    } else if (monthDiff > 0) {
      // `date2` is previous month(s) in different year.
      diff = monthDiff;
    }
  }

  return Math.abs(diff);
}

function differenceInDays(date1, date2) {
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);

  const time1 = newDate1.getTime();
  let time2 = newDate2.getTime();

  if (ONE_DAY_IN_MILLISECONDS > Math.abs(time1 - time2)) {
    // Early exit if the difference is not bigger than one day same day.
    return 0;
  }

  const action = time2 < time1 ? 'add' : 'subtract';
  let numOfDays = 0;
  let previousDiffOnMonths = 0;

  while (time1 !== time2) {
    if (action === 'add') {
      time2 += ONE_DAY_IN_MILLISECONDS;
    } else {
      time2 -= ONE_DAY_IN_MILLISECONDS;
    }

    newDate2.setTime(time2);
    numOfDays += 1;

    if (differenceInMonths(newDate1, newDate2) !== previousDiffOnMonths) {
      // Reset the numOfDays when we have switched to a different month, but same date.
      numOfDays = 0;
      previousDiffOnMonths += 1;
    }
  }

  return numOfDays;
}

function differenceInHours(date1, date2) {
  return Math.abs(date1.getHours() - date2.getHours());
}

function differenceInMinutes(date1, date2) {
  return Math.abs(date1.getMinutes() - date2.getMinutes());
}

function differenceInSeconds(date1, date2) {
  return Math.abs(date1.getSeconds() - date2.getSeconds());
}
