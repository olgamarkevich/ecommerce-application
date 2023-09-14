export const getCostString = (cost: number): string => {
  const intPart = String(Math.floor(cost / 100));
  const floatPart =
    cost % 100 > 9
      ? String(cost % 100).padEnd(2, '0')
      : String(cost % 100).padStart(2, '0');

  return `${intPart}.${floatPart}`;
};
