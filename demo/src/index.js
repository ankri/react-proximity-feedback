import React, { Component } from 'react';
import { render } from 'react-dom';

import DemoRef from './demos/Demo1';
import DemoDistance from './demos/Demo2';
import DemoIsNearby from './demos/Demo3';
import DemoProximity from './demos/Demo4';
import DemoPropsMaxDistance from './demos/Demo5';
import DemoForm from './demos/Demo6';

import ProximityFeedback from '../../src/ProximityFeedback';

const TouchWarning = () => (
  <div
    style={{
      border: '1px solid red',
      padding: 15,
      backgroundColor: 'MistyRose'
    }}
  >
    Touch only devices are not supported. Please use a desktop computer.
  </div>
);

class Demo extends Component {
  render() {
    // https://stackoverflow.com/a/4819886
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    return (
      <div>
        <h1>react-proximity-feedback Demo</h1>
        {isTouchDevice && <TouchWarning />}
        <DemoRef />
        <DemoDistance />
        <DemoIsNearby />
        <DemoProximity />
        <DemoPropsMaxDistance />
        <DemoForm />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
