// Display Money in Dollar Format
export const displayMoney = (n) => {
  const numFormat = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "USD",
  });

  return numFormat.format(n).split(".", 1);
};

// Calculate Discount Percentage
export const calculateDiscount = (discountedPrice, originalPrice) => {
  const discountedPercent = (discountedPrice / originalPrice) * 100;

  return Math.round(discountedPercent);
};

// Calculate Total Amount
export const calculateTotal = (arr) => {
  const total = arr.reduce((accum, val) => accum + val, 0);

  return total;
};

export const createdAt = () => {
  const today = new Date();
  const day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + day;
  const hour =
    today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
  const minute =
    today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  const second =
    today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
  const time = hour + ":" + minute + ":" + second;
  const seconds = new Date() / 1000;
  return { date, time, seconds };
};
