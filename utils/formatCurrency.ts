export function formatCurrency(amount: number, currency = "INR"): string {
  let locale;
  if (currency === "INR") {
    locale = "en-IN";
  } else if (currency === "USD") {
    locale = "en-US";
  } else {
    return amount.toString();
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}
