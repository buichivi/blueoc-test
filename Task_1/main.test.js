import mostFrequentStrings from './main';

test('should return the most frequent string length', () => {
  expect(mostFrequentStrings(['a', 'ab', 'abc', 'cd', 'def', 'gh'])).toStrictEqual([
    'ab',
    'cd',
    'gh',
  ]);
});
