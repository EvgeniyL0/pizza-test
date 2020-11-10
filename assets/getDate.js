export const dateInMs = (originalString) => {
  const arrOfString = originalString.split('.');
  arrOfString.reverse();
  return Date.parse(arrOfString.join('-'));
}