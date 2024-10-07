/**
 * Write a function that finds the sum of the two largest integers in an array.
 * @param { number[] } arr
 * @return { number }
 */

function sumOfTopTwoNumbers(arr) {
  if (arr.length < 2) throw new Error('Array must contain at least two numbers');
  const [first, second] = arr.sort((a, b) => b - a);
  return first + second;
}

module.exports = sumOfTopTwoNumbers;
