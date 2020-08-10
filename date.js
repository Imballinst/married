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

// Diff functions.
// I think in this case, we can't really rely on so-mini-functions.
// Years, months, days, until seconds should be unified.
function differenceInYears(date1, date2) {
  const monthDiff = date1.getMonth() - date2.getMonth();
  const subtractor = monthDiff < 0 ? 1 : 0;

  return Math.abs(date1.getFullYear() - date2.getFullYear()) - subtractor;
}

function differenceInMonths(date1, date2) {
  const dateInMonthDiff = date1.getDate() - date2.getDate();
  const monthDiff = date1.getMonth() - date2.getMonth();

  if (dateInMonthDiff === 0) {
    return Math.abs(monthDiff);
  }

  const dateInMonthSubtractor = dateInMonthDiff < 0 ? 1 : 0;

  return Math.abs(monthDiff) - dateInMonthSubtractor;
}

function differenceInDays(date1, date2) {
  const time1 = date1.getTime();
  const time2 = date2.getTime();

  const rawDiffInDays = (time1 - time2) / ONE_DAY_IN_MILLISECONDS;
  const diffInDays = Math.abs(rawDiffInDays);

  if (diffInDays <= 28) {
    // Early exit. We use 28 as it is the "safe" option when number of days in a month
    // ranging from 28 to 31.
    return Math.floor(diffInDays);
  }

  const dateInMonth1 = date1.getDate();
  const dateInMonth2 = date2.getDate();
  const differenceInDate = dateInMonth1 - dateInMonth2;

  if (differenceInDate > 0) {
    // Check hours.
    const hour1 = date1.getHours();
    const hour2 = date2.getHours();

    if (hour1 > hour2) {
      // Hour is bigger.
      return differenceInDate;
    }

    // Check minutes.
    const differenceInMinutes = rawDifferenceInMinutes(date1, date2);

    if (differenceInMinutes > 0) {
      // Minute is bigger.
      return differenceInDate;
    }

    // Check seconds.
    const differenceInSeconds = rawDifferenceInSeconds(date1, date2);

    if (differenceInSeconds > 0) {
      // Second is bigger.
      return differenceInDate;
    }

    return differenceInDate - 1;
  }
}

function differenceInHours(date1, date2, rawDiffInMinutesParam) {
  const rawDiffInMinutes =
    rawDiffInMinutesParam || rawDifferenceInMinutes(date1, date2);
  const diffInHours = Math.abs(rawDifferenceInHours(date1, date2));

  if (rawDiffInMinutes < 0) {
    // This is not full 1 minute yet.
    return diffInHours - 1;
  }

  return diffInHours;
}

function differenceInMinutes(date1, date2, rawDiffInSecondsParam) {
  const rawDiffInSeconds =
    rawDiffInSecondsParam || rawDifferenceInSeconds(date1, date2);
  const diffInMinutes = Math.abs(rawDifferenceInMinutes(date1, date2));

  if (rawDiffInSeconds < 0) {
    // This is not full 1 minute yet.
    return diffInMinutes - 1;
  }

  return diffInMinutes;
}

function differenceInSeconds(date1, date2) {
  return Math.abs(rawDifferenceInSeconds(date1, date2));
}

// Helper functions.
function getNumberOfDaysInMonth(date) {
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1);

  return endOfMonth.getDate();
}

function appendZeros(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return `${number}`;
}

// Raw diff functions without Math.abs().
function rawDifferenceInDays(date1, date2) {
  // For dates, it can be a litle bit complex, as they are not uniform.
  // Unlike seconds [0-59], minutes [0-59], and hours [0-23], date can vary.
  // Some months can have 31 days, some 30, and February may have 29 days instead of 28 on leap years.
  // Hence, we use this so we can use it in rawDifferenceInMonths and rawDifferenceInYears.
  return (date1.getTime() - date2.getTime()) / ONE_DAY_IN_MILLISECONDS;
}

function rawDifferenceInHours(date1, date2) {
  return date1.getHours() - date2.getHours();
}

function rawDifferenceInMinutes(date1, date2) {
  return date1.getMinutes() - date2.getMinutes();
}

function rawDifferenceInSeconds(date1, date2) {
  return date1.getSeconds() - date2.getSeconds();
}
