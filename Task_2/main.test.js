const sumOfTopTwoNumbers = require('./main');

describe('sum of the top two numbers', () => {
  test('should return the sum of the two largest integers', () => {
    expect(sumOfTopTwoNumbers([1, 2, 3, 4, 5])).toBe(9); // 4 + 5
  });
});
