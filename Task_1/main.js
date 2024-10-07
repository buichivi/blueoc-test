/**
 *  Write a function that identifies the most frequent string lengths in an array of strings.
 *  @param { string[] } arr
 *  @return { string[] }
 */
function mostFrequentStrings(arr) {
  const lengthCounts = arr.reduce((acc, item) => {
    const length = item.length;
    acc.set(length, (acc.get(length) || 0) + 1);
    return acc;
  }, new Map());

  const maxCount = Math.max(...Array.from(lengthCounts.values()));
  const mostFrequentLengths = Array.from(lengthCounts.keys()).filter(
    (length) => lengthCounts.get(length) === maxCount
  );
  return arr.filter((item) => mostFrequentLengths.includes(item.length));
}

module.exports = mostFrequentStrings;
