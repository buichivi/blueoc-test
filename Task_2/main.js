/**
 * Write a function that finds the sum of the two largest integers in an array.
 * @param { number[] } arr
 * @return { number }
 */

function sumOfTopTwoNumbers(arr) {
  const [first, second] = arr.sort((a, b) => b - a);
  return first + second;
}
