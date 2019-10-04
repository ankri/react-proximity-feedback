import { FunctionComponent } from 'react';
import useProximtiyFeedback, {
  ProximityFeedback as ProximityFeedbackResult,
  ProximityFeedbackOptions
} from './useProximityFeedback';

interface ProximityFeedbackRenderProp {
  children: (props: ProximityFeedbackResult) => JSX.Element;
}

/**
 * Based on Codrops article: Ideas for Proximity Feedback with Progressive Hover Effects
 * https://tympanus.net/codrops/2018/05/02/ideas-for-proximity-feedback-with-progressive-hover-effects/
 *
 * A small render prop component to provide proximity feedback of the mouse cursor and a DOM node (e.g. a button).
 *
 * ## Usage
 * Scenario: You want to continously calculate the distance between the mouse cursor and a `button`. Wrap the button inside the `<ProximityFeedback>`
 * component and provide the `ref` attribute.
 *
 * ```javascript
 * <ProximityFeedback>
 *  {
 *    ({ref, distance}) => <button ref={ref}>The mouse is {distance}px away</button>
 *  }
 * </ProximityFeedback>
 * ```
 *
 * ## Props
 * You can pass two props to the `ProximityFeedback` component:
 * - `threshold`: When the mouse is between 0 and this `threshold` in px the proximity feedback will be
 *                triggered and calculated.
 * - `throttleInMs`: The time in milliseconds the proximity will be calculated. The lower the number the higher
 *                   is the frequency the proximity will be calculated. Defaults to 250.
 *
 * ## Render Props
 * You have access to these render props:
 *
 * ### ref
 * It is important that you pass-through this `ref` to the DOM node you want to calculate the proximity of.
 *
 * Example:
 * ```javascript
 * <ProximityFeedback>
 *  {({ref}) => <button ref={ref}>Hello World</button>}
 * </ProximityFeedback>
 * ```
 *
 * ### distance
 * The distance between the "`ref`ed" component and the mouse cursor in px. From 0 to the provided `threshold` prop.
 *
 * Example:
 * ```javascript
 * <ProximityFeedback>
 *  {
 *    ({ref, distance}) => <button ref={ref}>The mouse cursor is {distance}px away</button>
 *  }
 * </ProximityFeedback>
 * ```
 *
 * ### isNearby
 * A boolean value to represent if the cursor is `0 <= distance < props.threshold`.
 *
 * Example:
 * ```javascript
 * <ProximityFeedback>
 *  {
 *    ({ref, isNearby}) => <button ref={ref}>The cursor is {isNearby ? 'nearby' : 'far away'}</button>
 *  }
 * </ProximityFeedback>
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
 * <ProximityFeedback>
 *  {
 *    ({ref, proximity}) => {
 *      const outlineStyle = `3x solid rgba(255,0,0, ${proximity}`;
 *      return <button ref={ref} style={outlineStyle}>Come closer</button>
 *    }
 *  }
 * </ProximityFeedback>
 * ```
 */
const ProximityFeedback: FunctionComponent<
  ProximityFeedbackOptions & ProximityFeedbackRenderProp
> = ({ threshold = 35, throttleInMs = 250, children }) => {
  const proximity = useProximtiyFeedback({
    threshold,
    throttleInMs
  });

  return children({ ...proximity });
};

export default ProximityFeedback;
