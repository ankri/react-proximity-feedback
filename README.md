# react-proximity-feedback

Based on Codrops article: [Ideas for Proximity Feedback with Progressive Hover Effects](https://tympanus.net/codrops/2018/05/02/ideas-for-proximity-feedback-with-progressive-hover-effects/)

Codrops [GitHub repository](https://github.com/codrops/ProximityFeedback/)

A small render prop component to provide proximity feedback of the mouse cursor and a DOM node (e.g. a button).

## Demo

[Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-form)

[![Edit react-proximity-feedback sandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/rm0kxl626q)

## Version 2.0.0

These features are new with version 2.0.0

- Rewritten in TypeScript
- Only visible elements will be considered. Thanks to @eastkorzh for the [inspiration](https://github.com/ankri/react-proximity-feedback/pull/1).
- There's also a hook now `useProximityFeedback({ threshold, throttleInMs})`

> **Important** With version 2.0.0 we use the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) which does not work in IE11. You'll need a [polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) for that

## Installation

Using npm

```
npm install --save react-proximity-feedback
```

## Constraints: No mobile support

Since you need access to the cursor this component this does not work on touch only devices.

# Usage

You want to calculate the distance between the mouse cursor and a `button`.

## With hooks

Use the hook and attach the returned `ref` to the component you want to calculate the distance to.

```jsx
import React from 'react';
import { useProximityFeedback } from 'react-proximity-feedback';

const DemoComponent = () => {
  const { ref, distance } = useProximityFeedback();

  return <button ref={ref}>The cursor is {distance}px away</button>;
};
```

### Arguments

You can optionally pass two arguments to the `useProximityFeedback` hook:

- `threshold`: When the mouse is between 0 and this `threshold` in px the proximity feedback will be triggered and calculated. ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-threshold))

- `throttleInMs`: The time in milliseconds the proximity will be calculated. The lower the number the higher is the frequency the proximity will be calculated. Defaults to 250.

### Returned values

#### ref

It is important that you pass-through this `ref` to the DOM node you want to calculate the proximity of.

Example ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-ref))

```jsx
const Demo = () => {
  const { ref } = useProximityFeedback();
  return <button ref={ref}>Hello World</button>;
};
```

#### distance

The distance between the "`ref`ed" component and the mouse cursor in px.

Example ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-distance))

```jsx
const Demo = () => {
  const { ref, distance } = useProximityFeedback();

  return <button ref={ref}>The mouse cursor is {distance}px away</button>;
};
```

#### isNearby

A boolean value to represent if the cursor is `0 <= distance <= props.threshold`.

Example ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-is-nearby))

```jsx
const Demo = () => {
  const { ref, isNearby } = useProximityFeedback();

  return (
    <button ref={ref}>The cursor is {isNearby ? 'nearby' : 'far away'}</button>
  );
};
```

#### proximity

A float value from `0` to `1` rounded to two decimal places. When the distance of the mouse cursor
is >= `props.threshold` the `proximity` value is `0`. The proximity is `1` if the cursor is right on top of the
"`ref`ed" component.
It represents the value from `0%` proximity to `100%` proximity.

Example ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-proximity))

```javascript
const Demo = () => {
  const { ref, proximity } = useProximityFeedback();

  const outlineStyle = `3x solid rgba(255,0,0, ${proximity})`;
  return (
    <button ref={ref} style={outlineStyle}>
      Come closer
    </button>
  );
};
```

## With the render prop component

Wrap the button inside the `<ProximityFeedback>` component and provide the `ref` attribute.

```jsx
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

### Props

You can pass two props to the `ProximityFeedback` component:

- `threshold`: When the mouse is between 0 and this `threshold` in px the proximity feedback will be triggered and calculated. ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-threshold))

- `throttleInMs`: The time in milliseconds the proximity will be calculated. The lower the number the higher is the frequency the proximity will be calculated. Defaults to 250.

### Render Props

You have access to these render props. More information on [render-props](https://reactjs.org/docs/render-props.html)

#### ref

It is important that you pass-through this `ref` to the DOM node you want to calculate the proximity of.

Example ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-ref))

```javascript
<ProximityFeedback>
  {({ ref }) => <button ref={ref}>Hello World</button>}
</ProximityFeedback>
```

#### distance

The distance between the "`ref`ed" component and the mouse cursor in px.

Example ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-distance))

```javascript
<ProximityFeedback>
  {({ ref, distance }) => (
    <button ref={ref}>The mouse cursor is {distance}px away</button>
  )}
</ProximityFeedback>
```

#### isNearby

A boolean value to represent if the cursor is `0 <= distance <= props.threshold`.

Example ([Demo](https://ankri.github.io/react-proximity-feedback/index.html#demo-is-nearby))

```javascript
<ProximityFeedback>
  {({ ref, isNearby }) => (
    <button ref={ref}>The cursor is {isNearby ? 'nearby' : 'far away'}</button>
  )}
</ProximityFeedback>
```

#### proximity

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

# Development

## Testing

Testing is done via [cypress](https://cypress.io).

## Commands

- `npm run test` Run the jest test in `tests/ProximityFeedback.test.js` once
- `npm run test:headless` Run the cypress test in [headless mode](https://docs.cypress.io/guides/guides/command-line.html#cypress-run)

## Build

Run `npm run build` to build the project and copy the demo files from `demo/dist/` to `docs/`.

---

This project is using [tsdx](https://github.com/jaredpalmer/tsdx)
