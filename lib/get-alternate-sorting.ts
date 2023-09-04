// Function which orders array alternatingly one value is larger than 0 then another value is smaller than 0 and so one

export const list = [
  {
    type: "A",
    stance: 3,
  },
  {
    type: "A",
    stance: 3,
  },
  {
    type: "B",
    stance: -3,
  },
  {
    type: "B",
    stance: -3,
  },
  {
    type: "A",
    stance: 3,
  },
];

export enum StartingPoint {
  pos = "pos",
  neg = "neg",
}

export const getAlternateSorting = (arr: any, startsWith: StartingPoint) => {
  const posResults = arr.filter((item) => item.stance > 0);
  const negResults = arr.filter((item) => item.stance < 0);

  // Alternate ordering A, B, A, B, A, B
  const sortedList = [];
  for (let i = 0; i < arr.length; i++) {
    if (startsWith === StartingPoint.pos) {
      let item = posResults.shift();
      if (item !== undefined) {
        sortedList.push(item);
        startsWith = StartingPoint.neg;
      }
    } else {
      let item = negResults.shift();
      if (item !== undefined) {
        sortedList.push(item);
        startsWith = StartingPoint.pos;
      }
    }
  }
  return sortedList;
};
