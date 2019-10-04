/**
 * Return the x and y coordinates of the mouse cursor.
 *
 * @see https://github.com/codrops/ProximityFeedback/blob/master/js/nearby.js#L18
 * @see http://www.quirksmode.org/js/events_properties.html#position
 *
 * @param {MouseEvent} mouseEvent The MouseEvent. Defaults to window.event
 */
export default function getMousePosition(
  mouseEvent: MouseEvent
): {
  x: number;
  y: number;
} {
  const xPosition =
    mouseEvent.clientX +
    document.body.scrollLeft +
    document.documentElement.scrollLeft;
  const yPosition =
    mouseEvent.clientY +
    document.body.scrollTop +
    document.documentElement.scrollTop;

  return { x: xPosition, y: yPosition };
}
