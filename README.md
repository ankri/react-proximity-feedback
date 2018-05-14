# react-proximity-feedback

Based on Codrops article: [Ideas for Proximity Feedback with Progressive Hover Effects](https://tympanus.net/codrops/2018/05/02/ideas-for-proximity-feedback-with-progressive-hover-effects/)

Codrops [GitHub repository](https://github.com/codrops/ProximityFeedback/)

A small render prop component to provide proximity feedback of the mouse cursor and a DOM node (e.g. a button).

## Demo

[Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-form)
[![Edit react-proximity-feedback sandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/rm0kxl626q)

## Installation

Using npm

```
npm install --save react-proximity-feedback
```

## Usage

You want to calculate the distance between the mouse cursor and a `button`. Wrap the button inside the `<ProximityFeedback>`
component and provide the `ref` attribute.

```javascript
import React from 'react';
import ProximityFeedback from 'react-proximity-feedback';

const DemoComponent = () => (
  <ProximityFeedback>
    {({ ref, distance }) => (
      <button ref={ref}>The cursor is {distance}px away</button>
    )}
  </ProximityFeedback>
);

export default DemoComponent;
```

Try it out on [CodeSandbox](https://codesandbox.io/s/rm0kxl626q)

## Constraints

There is no mobile version available. Since you need access to the cursor this component does not make sense on touch only devices.

## Props

You can pass two props to the `ProximityFeedback` component:

* `threshold`: When the mouse is between 0 and this `threshold` in px the proximity feedback will be triggered and calculated. ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-threshold))

* `throttleInMs`: The time in milliseconds the proximity will be calculated. The lower the number the higher is the frequency the proximity will be calculated. Defaults to 250.

## Render Props

You have access to these render props. More information on [render-props](https://reactjs.org/docs/render-props.html)

### ref

It is important that you pass-through this `ref` to the DOM node you want to calculate the proximity of.

Example ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-ref))

```javascript
<ProximityFeedback>
  {({ ref }) => <button ref={ref}>Hello World</button>}
</ProximityFeedback>
```

### distance

The distance between the "`ref`ed" component and the mouse cursor in px. From 0 to the provided `threshold` prop.

Example ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-distance))

```javascript
<ProximityFeedback>
  {({ ref, distance }) => (
    <button ref={ref}>The mouse cursor is {distance}px away</button>
  )}
</ProximityFeedback>
```

### isNearby

A boolean value to represent if the cursor is `0 <= distance <= props.threshold`.

Example ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-is-nearby))

```javascript
<ProximityFeedback>
  {({ ref, isNearby }) => (
    <button ref={ref}>The cursor is {isNearby ? 'nearby' : 'far away'}</button>
  )}
</ProximityFeedback>
```

### proximity

A float value from `0` to `1` rounded to two decimal places. When the distance of the mouse cursor
is >= `props.threshold` the `proximity` value is `0`. The proximity is `1` if the cursor is right on top of the
"`ref`ed" component.
It represents the value from `0%` proximity to `100%` proximity.

Example ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-proximity))

```javascript
<ProximityFeedback>
  {({ ref, proximity }) => {
    const outlineStyle = `3x solid rgba(255,0,0, ${proximity})`;
    return (
      <button ref={ref} style={outlineStyle}>
        Come closer
      </button>
    );
  }}
</ProximityFeedback>
```
