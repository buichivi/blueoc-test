const mostFrequentStrings = require('./main');

test('should return the most frequent string length', () => {
  expect(mostFrequentStrings(['a', 'ab', 'abc', 'cd', 'def', 'gh'])).toStrictEqual([
    'ab',
    'cd',
    'gh',
  ]);
});

test('shoud return the same array because every element has a difference length', () => {
  expect(mostFrequentStrings(['a', 'ab', 'abc', 'abcd'])).toStrictEqual(['a', 'ab', 'abc', 'abcd']);
});

test('should return strings of the most frequent lengths', () => {
  expect(mostFrequentStrings(['a', 'abcd', 'b', 'ab', 'cd'])).toStrictEqual(['a', 'b', 'ab', 'cd']);
});

test('should return undefined for an empty array', () => {
  expect(mostFrequentStrings([])).toStrictEqual([]);
});
