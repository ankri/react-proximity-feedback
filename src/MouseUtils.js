/**
 * Return the x and y coordinates of the mouse cursor.
 *
 * @see https://github.com/codrops/ProximityFeedback/blob/master/js/nearby.js#L18
 * @see http://www.quirksmode.org/js/events_properties.html#position
 *
 * @param {*} mouseEvent The MouseEvent. Defaults to window.event
 */
export function getMousePosition(mouseEvent) {
  let xPosition = 0;
  let yPosition = 0;
  const event = !mouseEvent ? window.event : mouseEvent;

  if (event.pageX || event.pageY) {
    xPosition = event.pageX;
    yPosition = event.pageY;
  } else if (event.clientX || event.clientY) {
    xPosition =
      event.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    yPosition =
      event.clientY +
      document.body.scrollTop +
      document.documentElement.scrollTop;
  }
  return { x: xPosition, y: yPosition };
}
