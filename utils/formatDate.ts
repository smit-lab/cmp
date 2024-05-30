export function formatDate(date: Date, showTime = true): string {
  if (!date) {
    return "Null";
  }
  if (showTime) {
    return date.toLocaleString("en-IN");
  }
  return date.toLocaleDateString("en-IN");
}

export function formateDateWithMilliseconds(milliseconds: number): Date {
  const date = new Date(milliseconds * 1000);

  return date;
}
