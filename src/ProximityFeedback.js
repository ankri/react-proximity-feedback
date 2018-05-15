import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import { distancePoints, lineEq } from './MathUtils';
import getMousePosition from './MouseUtils';

/**
 * Based on Codrops article: Ideas for Proximity Feedback with Progressive Hover Effects
 * https://tympanus.net/codrops/2018/05/02/ideas-for-proximity-feedback-with-progressive-hover-effects/
 *
 * A small render prop component to provide proximity feedback of the mouse cursor and a DOM node (e.g. a button).
 *
 * ## Usage
 * You want to calculate the distance between the mouse cursor and a `button`. Wrap the button inside the `<ProximityFeedback>`
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
 * A boolean value to represent if the cursor is `0 <= distance <= props.threshold`.
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
class ProximityFeedback extends Component {
  static propTypes = {
    /**
     * When the mouse is between 0 and this `threshold` in px the proximity feedback will be triggered and calculated.
     */
    threshold: PropTypes.number,
    /**
     * The time in milliseconds the proximity will be calculated. The lower the number the higher
     * is the frequency the proximity will be calculated. Defaults to 250.
     */
    throttleInMs: PropTypes.number,

    /**
     * Render props function. Available render props
     * - ref
     * - distance
     * - isNearby
     * - proximity
     */
    children: PropTypes.func
  };

  static defaultProps = {
    threshold: 35,
    throttleInMs: 250
  };

  state = {
    isNearby: false,
    distance: -1
  };

  ref = React.createRef();

  onMouseMove = event =>
    // see for vanilla js implementation:
    // https://github.com/codrops/ProximityFeedback/blob/master/js/nearby.js#L39
    requestAnimationFrame(() => {
      // no ref provided. cancel
      if (!this.ref || !this.ref.current) {
        return;
      }

      const mousePosition = getMousePosition(event);
      const documentScrolls = {
        left: document.body.scrollLeft + document.documentElement.scrollLeft,
        top: document.body.scrollTop + document.documentElement.scrollTop
      };
      const elementRectangle = this.ref.current.getBoundingClientRect();
      const elementCoordinates = {
        x1: elementRectangle.left + documentScrolls.left,
        x2:
          elementRectangle.width + elementRectangle.left + documentScrolls.left,
        y1: elementRectangle.top + documentScrolls.top,
        y2: elementRectangle.height + elementRectangle.top + documentScrolls.top
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
      const proximity = 1 - lineEq(0, 1, 0, this.props.threshold, distance);

      this.setState({
        distance,
        proximity,
        isNearby: distance <= this.props.threshold
      });
    });

  throttled = throttle(this.onMouseMove, this.props.throttleInMs);

  componentDidMount() {
    if (!this.ref || !this.ref.current) {
      throw new Error(
        'ProximityFeedback needs a DOM node with a ref. Instuctions: https://github.com/ankri/react-proximity-feedback#ref'
      );
    } else {
      window.addEventListener('mousemove', this.throttled);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.throttled);
  }

  render() {
    return this.props.children({ ref: this.ref, ...this.state });
  }
}

export default ProximityFeedback;
