import React, { MutableRefObject } from 'react';
import { observeElementInViewport } from 'observe-element-in-viewport';
import { throttle } from 'lodash';
import getMousePosition from './MouseUtils';
import { distancePoints, lineEq } from './MathUtils';

export interface ProximityFeedbackOptions {
  threshold?: number;
  throttleInMs?: number;
}

export interface ProximityFeedback {
  ref: MutableRefObject<any>;
  distance: number;
  proximity: number;
  isNearby: boolean;
}

const callOnMouseMove = ({
  callback,
  ref,
  threshold
}: {
  callback: (options: Omit<ProximityFeedback, 'ref'>) => void;
  ref: MutableRefObject<any>;
  threshold: number;
}) => {
  return (event: MouseEvent) => {
    if (ref.current !== null) {
      // see for vanilla js implementation:
      // https://github.com/codrops/ProximityFeedback/blob/master/js/nearby.js#L39
      requestAnimationFrame(() => {
        const mousePosition = getMousePosition(event);
        const documentScrolls = {
          left: document.body.scrollLeft + document.documentElement.scrollLeft,
          top: document.body.scrollTop + document.documentElement.scrollTop
        };
        const elementRectangle = ref.current!.getBoundingClientRect();
        const elementCoordinates = {
          x1: elementRectangle.left + documentScrolls.left,
          x2:
            elementRectangle.width +
            elementRectangle.left +
            documentScrolls.left,
          y1: elementRectangle.top + documentScrolls.top,
          y2:
            elementRectangle.height + elementRectangle.top + documentScrolls.top
        };
        const closestPoint = { x: mousePosition.x, y: mousePosition.y };

        if (mousePosition.x < elementCoordinates.x1) {
          closestPoint.x = elementCoordinates.x1;
        } else if (mousePosition.x > elementCoordinates.x2) {
          closestPoint.x = elementCoordinates.x2;
        }
        if (mousePosition.y < elementCoordinates.y1) {
          closestPoint.y = elementCoordinates.y1;
        } else if (mousePosition.y > elementCoordinates.y2) {
          closestPoint.y = elementCoordinates.y2;
        }

        const distance = Math.floor(
          distancePoints(
            mousePosition.x,
            mousePosition.y,
            closestPoint.x,
            closestPoint.y
          )
        );

        const proximity =
          Math.round((1 - lineEq(0, 1, 0, threshold, distance)) * 100) / 100;

        callback({ distance, proximity, isNearby: distance <= threshold });
      });
    }
  };
};

/**
 * Based on Codrops article: Ideas for Proximity Feedback with Progressive Hover Effects
 * https://tympanus.net/codrops/2018/05/02/ideas-for-proximity-feedback-with-progressive-hover-effects/
 *
 * A hook to provide proximity feedback of the mouse cursor and a DOM node (e.g. a button).
 *
 * ## Usage
 * Scenario: You want to continously calculate the distance between the mouse cursor and a `button`. Use
 * the `useProximityFeedback` hook. It returns a `ref`. Attach that `ref` to the `button`.
 *
 * ```jsx
 * const Button = () => {
 *  const { ref, distance } = useProximityFeedback();
 *  return <button ref={ref}>The mouse cursor is {distance}px away</button>
 * }
 * ```
 *
 * ## Arguments
 * You can pass two arguments to the `useProximityFeedback` hook:
 * - `threshold`: When the mouse is between 0 and this `threshold` in px the proximity feedback will be
 *                triggered and calculated.
 * - `throttleInMs`: The time in milliseconds the proximity will be calculated. The lower the number the higher
 *                   is the frequency the proximity will be calculated. Defaults to 250.
 *
 * ## Returned values
 * You have access to these values:
 *
 * ### ref
 * It is important that you pass-through this `ref` to the DOM node you want to calculate the proximity of.
 *
 * Example:
 * ```javascript
 * const Button = () => {
 *  const { ref } = useProximityFeedback();
 *  return <button ref={ref}>The button</button>
 * }
 * ```
 *
 * ### distance
 * The distance between the "`ref`ed" component and the mouse cursor in px. From 0 to the provided `threshold` prop.
 *
 * Example:
 * ```jsx
 * const Button = () => {
 *  const { ref, distance } = useProximityFeedback();
 *  return <button ref={ref}>The cursor is {distance}px away</button>
 * }
 * ```
 *
 * ### isNearby
 * A boolean value to represent if the cursor is `0 <= distance < threshold`.
 *
 * Example:
 * ```javascript
 * const Button = () => {
 *  const { ref, isNearby } = useProximityFeedback();
 *  return <button ref={ref}>The cursor is {isNearby ? 'nearby' : 'far away'}</button>
 * }
 * ```
 *
 * ### proximity
 * A float value from `0` to `1` rounded to two decimal places. When the distance of the mouse cursor
 * is >= `props.threshold` the `proximity` value is `0`. The proximity is `1` if the cursor is right on top of the
 * "`ref`ed" component.
 * It represents the value from `0%` proximity to `100%` proximity.
 *
 * Example:
 * ```javascript
 * const Button = () => {
 *  const { ref, proximity } = useProximityFeedback();
 *  const outlineStyle = `3x solid rgba(255,0,0, ${proximity}`;
 *
 *  return <button ref={ref} style={outlineStyle}>Move the cursor closer</button>
 * }
 * ```
 */
const useProximtiyFeedback = (
  options?: ProximityFeedbackOptions
): ProximityFeedback => {
  const { threshold = 35, throttleInMs = 250 } = options || {};

  const [distance, setDistance] = React.useState(0);
  const [proximity, setProximity] = React.useState(0);
  const [isNearby, setIsNearby] = React.useState(false);
  const [isInViewport, setIsInViewport] = React.useState(false);

  const ref = React.useRef<any>(null);

  const onMouseMove = React.useCallback(
    callOnMouseMove({
      threshold,
      ref,
      callback: ({ distance, proximity, isNearby }) => {
        setDistance(distance);
        setProximity(proximity);
        setIsNearby(isNearby);
      }
    }),
    [ref, threshold]
  );

  const throttledOnMouseMove = React.useCallback(
    throttle(onMouseMove, throttleInMs),
    [throttleInMs, threshold]
  );

  React.useEffect(() => {
    if (ref.current !== null) {
      return observeElementInViewport(
        ref.current,
        () => {
          setIsInViewport(true);
        },
        () => {
          setIsInViewport(false);
        },
        {
          viewport: null
        }
      );
    } else {
      return undefined;
    }
  }, [ref]);

  React.useEffect(() => {
    if (isInViewport) {
      document.addEventListener('mousemove', throttledOnMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', throttledOnMouseMove);
    };
  }, [distance, isInViewport]);

  return {
    distance,
    proximity,
    isNearby,
    ref
  };
};

export default useProximtiyFeedback;
