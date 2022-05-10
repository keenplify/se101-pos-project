export function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

export function getSunday(d) {
  const first = d.getDate() - d.getDay() + 1;
  const last = first + 6;
  const sunday = new Date(d.setDate(last));
  return sunday;
}

export function getMonthStartAndEndDays(d) {
  var y = d.getFullYear()
  var m = d.getMonth();
  var startDate = new Date(y, m, 1);
  var endDate = new Date(y, m + 1, 0);
  return {
    startDate, endDate
  }
}