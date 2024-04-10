enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export function getDayName(
  day: DayOfWeek,
  config?: { asAbbreviation: boolean }
): string {
  let dayName = "";

  switch (day) {
    case DayOfWeek.Sunday:
      dayName = "Sunday";
      break;
    case DayOfWeek.Monday:
      dayName = "Monday";
      break;
    case DayOfWeek.Tuesday:
      dayName = "Tuesday";
      break;
    case DayOfWeek.Wednesday:
      dayName = "Wednesday";
      break;
    case DayOfWeek.Thursday:
      dayName = "Thursday";
      break;
    case DayOfWeek.Friday:
      dayName = "Friday";
      break;
    case DayOfWeek.Saturday:
      dayName = "Saturday";
      break;
    default:
      throw new Error("Invalid day value");
  }

  if (config && config.asAbbreviation) {
    dayName = dayName.slice(0, 3);
  }

  return dayName;
}
