import React from 'react';
import PropTypes from 'prop-types';
import DemoContainer from './DemoContainer';
import ProximityFeedback from '../../../src/ProximityFeedback';

const code = `<ProximityFeedback>
  {({ ref, isNearby }) => (
    <div style={{ border: '1px solid red', padding: 35, display: 'inline-block', backgroundColor: isNearby ? '#EFEFEF' : '#FFF' }}>
      <button ref={ref}>
        The mouse cursor is {isNearby ? 'nearby' : 'far away'}
      </button>
    </div>
  )}
</ProximityFeedback>
`;

const DemoIsNearby = ({ number }) => (
  <DemoContainer
    number={number}
    heading="isNearby"
    name="demo-is-nearby"
    description="Use the boolean value isNearby."
    code={code}
  >
    <div>
      <ProximityFeedback>
        {({ ref, isNearby }) => (
          <div
            style={{
              border: '1px solid red',
              display: 'inline-block',
              padding: 35,
              backgroundColor: isNearby ? '#EFEFEF' : '#FFF'
            }}
          >
            <button ref={ref} data-test="button-is-nearby">
              The mouse cursor is {isNearby ? 'nearby' : 'far away'}
            </button>
          </div>
        )}
      </ProximityFeedback>
    </div>
  </DemoContainer>
);

DemoIsNearby.propTypes = {
  number: PropTypes.number.isRequired
};

export default DemoIsNearby;
