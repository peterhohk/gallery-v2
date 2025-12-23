export function howLongAgo(other: Date): string {
  function daysInMonth(year: number, month: number): number {
    return new Date(year, (month - 1) + 1, 0).getDate();
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  other.setHours(0, 0, 0, 0);
  if (other > today) {
    return "future?";
  }

  let yearDiff = today.getFullYear() - other.getFullYear();
  let monthDiff = (today.getMonth() + 1) - (other.getMonth() + 1);
  let dayDiff = today.getDate() - other.getDate();
  if (dayDiff < 0) {
    const carryYear = today.getMonth() + 1 === 1 ? today.getFullYear() - 1 : today.getFullYear();
    const carryMonth = today.getMonth() + 1 === 1 ? 12 : (today.getMonth() + 1) - 1;
    dayDiff += daysInMonth(carryYear, carryMonth);
    monthDiff--;
  }
  if (monthDiff < 0) {
    monthDiff += 12;
    yearDiff--;
  }

  const yearDiffString = `${yearDiff} year${yearDiff === 1 ? "" : "s"}`;
  const monthDiffString = `${monthDiff} month${monthDiff === 1 ? "" : "s"}`;
  const dayDiffString = `${dayDiff} day${dayDiff === 1 ? "" : "s"}`;
  if (yearDiff > 0) {
    return `${yearDiffString}${monthDiff > 0 ? ", " + monthDiffString : ""} ago`;
  }
  if (monthDiff > 0) {
    return `${monthDiffString}${dayDiff > 0 ? ", " + dayDiffString : ""} ago`;
  }
  if (dayDiff > 0) {
    return `${dayDiffString} ago`;
  }
  return `today`;
}
