/**
 *  Write a function that identifies the most frequent string lengths in an array of strings.
 *  @param { string[] } arr
 *  @return { string[] }
 */
export default function mostFrequentStrings(arr) {
  const lengthCounts = arr.reduce((acc, item) => {
    const length = item.length;
    const count = (acc.get(length) || 0) + 1;
    acc.set(length, count);
    return acc;
  }, new Map());

  const maxCount = Math.max(...Array.from(lengthCounts.values()));
  const mostFrequentLength = Array.from(lengthCounts.keys()).filter(
    (length) => lengthCounts.get(length) === maxCount
  );
  return arr.filter((item) => mostFrequentLength.includes(item.length));
}
