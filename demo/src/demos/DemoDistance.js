import React from 'react';
import PropTypes from 'prop-types';
import DemoContainer from './DemoContainer';
import ProximityFeedback from '../../../src/ProximityFeedback';

const code = `<ProximityFeedback>
  {
    ({ref, distance}) => <button ref={ref}>The mouse cursor is {distance}px away</button>
  }
</ProximityFeedback>
`;

const DemoDistance = ({ number }) => (
  <DemoContainer
    number={number}
    heading="distance"
    name="demo-distance"
    description="Display the distance between the cursor and the component."
    code={code}
  >
    <div>
      <ProximityFeedback>
        {({ ref, distance }) => (
          <button ref={ref} data-test="button-distance">
            The mouse cursor is {distance}px away
          </button>
        )}
      </ProximityFeedback>
    </div>
  </DemoContainer>
);

DemoDistance.propTypes = {
  number: PropTypes.number.isRequired
};

export default DemoDistance;
