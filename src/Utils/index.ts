export const generateRandomNumberBetweenMaxAndMinValue = (
  minValue: number,
  maxValue: number
) => {
  const isMinValueGreaterThanMax = minValue > maxValue;
  if (isMinValueGreaterThanMax)
    throw new Error("Min value has to be smaller than max value");

  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

export const generateArrayOfUniqueRandomNumbers = (
  howManyNumbers: number,
  minValue: number,
  maxValue: number
) => {
  if (maxValue - minValue + 1 < howManyNumbers)
    throw new Error(
      "Given number of nums can not be generated out of specifed range."
    );

  const arrayOfUniqueNumbers: number[] = [];

  do {
    const randomNumber = generateRandomNumberBetweenMaxAndMinValue(
      minValue,
      maxValue
    );

    if (arrayOfUniqueNumbers.indexOf(randomNumber) === -1) {
      arrayOfUniqueNumbers.push(randomNumber);
    }
  } while (arrayOfUniqueNumbers.length <= howManyNumbers);

  return arrayOfUniqueNumbers;
};
