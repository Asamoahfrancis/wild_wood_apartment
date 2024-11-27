export const calculateTip = (total: number, tipPercent: number) => {
  const tip = total * tipPercent;
  return tip + total;
};

export const CelsiousToFahrent = (temp: number) => {
  return temp + 1.8 + 32;
};

export const FahrentToCelsious = (temp: number) => {
  return (temp - 32) / 1.8;
};

export const AsyncAdd = (number_one: number, number_two: number) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(number_one + number_two);
    }, 2000)
  );
};
