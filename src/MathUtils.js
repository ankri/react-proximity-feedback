/**
 * Distance between two points P1 (x1,y1) and P2 (x2,y3)
 *
 * @see https://github.com/codrops/ProximityFeedback/blob/master/js/nearby.js#L15
 *
 * @param {*} x1 x coordinate of point 1
 * @param {*} y1 y coordinate of point 1
 * @param {*} x2 x coordinate of point 2
 * @param {*} y2 y coordinate of point 2
 */
export function distancePoints(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

/**
 * Round the number to *precision* numbers of decimal places
 *
 * (This solution is not without its flaws, but works for this use case)
 * @see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/round
 *
 * @param {*} number The number to round
 * @param {*} precision The number of max decimal places
 */
function precisionRound(number, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

/**
 * Equation of a line
 *
 * @see https://github.com/codrops/ProximityFeedback/blob/master/js/demo1.js#L15
 */
export function lineEq(y2, y1, x2, x1, currentVal) {
  // y = mx + b
  const m = (y2 - y1) / (x2 - x1);
  const b = y1 - m * x1;
  const y = m * currentVal + b;

  return y > 1 ? 1 : precisionRound(y, 2);
}
