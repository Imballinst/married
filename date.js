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
// Re-assign functions from JavaScript engine.
const { floor, abs } = Math;

// Export.
module.exports = {
  // Export the constants, too.
  WEDDING_DATE,
  // Export the functions.
  calculate,
  render,
  appendZeros,
  getNumberOfDaysInMonth
};

function calculate(currentDate = new Date()) {
  let numberOfDaysInMilliseconds = 365 * ONE_DAY_IN_MILLISECONDS;

  let years;
  let months;
  let days;
  let hours;
  let minutes;
  let seconds;

  // Get raw time.
  const weddingMilliSeconds = WEDDING_DATE.getTime();
  const currentMilliSeconds = currentDate.getTime();
  const diff = currentMilliSeconds - weddingMilliSeconds;

  // We can cut off years first as the number of days is static, 365 or 366.
  years = diff / numberOfDaysInMilliseconds;
  const yearsRemainder = diff % numberOfDaysInMilliseconds;

  // For months and days, however, it's a little bit tricky.
  const weddingMonth = WEDDING_DATE.getMonth();
  const currentMonth = currentDate.getMonth();

  // Don't forget to subtract this if date, hours, minutes, seconds is lesser.
  months = abs(weddingMonth - currentMonth);

  // Days.
  const weddingDateInMonth = WEDDING_DATE.getDate();
  const currentDateInMonth = currentDate.getDate();

  days = abs(weddingDateInMonth - currentDateInMonth);
  const daysRemainder = yearsRemainder % ONE_DAY_IN_MILLISECONDS;

  // Time.
  hours = floor(daysRemainder / ONE_HOUR_IN_SECONDS);
  const hoursRemainder = daysRemainder / ONE_HOUR_IN_SECONDS;

  minutes = floor(hoursRemainder / ONE_MINUTE_IN_SECONDS);
  seconds = hoursRemainder % ONE_MINUTE_IN_SECONDS;

  if (currentDateInMonth === weddingDateInMonth) {
    // Check hours.
    const weddingHours = WEDDING_DATE.getHours();

    if (hours < weddingHours) {
      days -= 1;
    } else if (hours === weddingHours) {
      // Check minutes.
      const weddingMinutes = WEDDING_DATE.getMinutes();

      if (minutes < weddingMinutes) {
        hours -= 1;
      } else if (minutes === weddingMinutes) {
        // Check seconds.
        if (seconds < WEDDING_DATE.getSeconds()) {
          minutes -= 1;
        }
      }
    }
  } else if (currentDateInMonth < weddingDateInMonth) {
    months -= 1;
  }

  // If any of them is less than 1, set to maximum.
  if (minutes < 0) {
    minutes = ONE_MINUTE_IN_SECONDS - 1;
    hours -= 1;
  }

  if (hours < 0) {
    hours = 23;
    days -= 1;
  }

  if (days < 0) {
    days = getNumberOfDaysInMonth(WEDDING_DATE) - 1;
    months -= 1;
  }

  if (months < 0) {
    // We don't set years here because it's guaranteed to be valid with the floor division.
    months = 11;
  }

  return { years, months, days, hours, minutes, seconds };
}

function render({ years, months, days, hours, minutes, seconds }) {
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
function getNumberOfDaysInMonth(date) {
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return endOfMonth.getDate();
}

function appendZeros(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return `${number}`;
}
