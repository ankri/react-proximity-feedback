import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';

import DemoCodrops from './demos/DemoCodrops';
import DemoRef from './demos/DemoRef';
import DemoDistance from './demos/DemoDistance';
import DemoIsNearby from './demos/DemoIsNearby';
import DemoProximity from './demos/DemoProximity';
import DemoPropsThreshold from './demos/DemoPropsThreshold';
import DemoForm from './demos/DemoForm';

import './demo.css';

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

const Demo = () => {
  // https://stackoverflow.com/a/4819886
  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return (
    <div>
      <h1>react-proximity-feedback Demo</h1>
      {isTouchDevice && <TouchWarning />}
      <section>
        <h2>Documentation</h2>
        <a
          href="https://github.com/ankri/react-proximity-feedback"
          rel="noopener noreferrer"
          target="_blank"
        >
          https://github.com/ankri/react-proximity-feedback
        </a>
      </section>

      <DemoCodrops number={1} />
      <DemoRef number={2} />
      <DemoDistance number={3} />
      <DemoIsNearby number={4} />
      <DemoProximity number={5} />
      <DemoPropsThreshold number={6} />
      <DemoForm number={7} />
    </div>
  );
};

ReactDOM.render(<Demo />, document.querySelector('#root'));
