export const daysArray = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const timesArray = () => {
  let array = [];
  for (let index = 0; index < 24; index++) {
    const element = array[index];
    array.push(`${index}:00`);
  }
  return array;
};
