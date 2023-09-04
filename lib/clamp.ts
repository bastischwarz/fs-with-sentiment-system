// Convert a positive integer to clamp to a range of -3 + 3
export const clamp = (n: number, oldMax: number = 7, newMax: number = 3) => {
  return n - oldMax + newMax;
};
