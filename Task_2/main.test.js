const sumOfTopTwoNumbers = require('./main');

describe('sum of the top two numbers', () => {
  test('should return the sum of the two largest integers', () => {
    expect(sumOfTopTwoNumbers([1, 2, 3, 4, 5])).toBe(9); // 4 + 5
    expect(sumOfTopTwoNumbers([-1, -2, -3, -4])).toBe(-3); // -1 + -2
    expect(sumOfTopTwoNumbers([10, 20, 30, 40, 50])).toBe(90); // 40 + 50
  });

  test('should throw an error if the array has less than two integers', () => {
    expect(() => sumOfTopTwoNumbers([1])).toThrow('Array must contain at least two numbers');
    expect(() => sumOfTopTwoNumbers([])).toThrow('Array must contain at least two numbers');
  });

  test('should handle an array with duplicate values', () => {
    expect(sumOfTopTwoNumbers([5, 5, 5, 5])).toBe(10); // 5 + 5
  });
});
