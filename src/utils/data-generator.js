/**
 * Contains helpful functions that aids in prototyping a visualization
 * component.
 */

/**
 * Returns an array of k random values in specified range. Defaults to [0,1].
 */
export function randomValues(k, min = 0, max = 1) {
  let res = []
  while (k) {
    res.push(Math.random() * (max - min) + min)
    k--;
  }

  return res
}

/**
 * Returns an array of k random integers in specified range. Defaults to [0,10].
 */
export function randomInts(k, min = 0, max = 10) {
  let res = []
  while (k) {
    res.push(getRandomInt(min, max))
    k--;
  }

  return res
}

/**
 * Returns a single random integer.
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
