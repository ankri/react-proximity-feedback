import React from 'react';
import PropTypes from 'prop-types';
import DemoContainer from './DemoContainer';
import ProximityFeedback from '../../../src/ProximityFeedback';

const code = `<ProximityFeedback>
  {({ ref, proximity }) => (
    <div style={{ border: '1px solid red', display: 'inline-block', padding: 35 }}>
      <button ref={ref} style={{ outline: \`3px solid rgba(255,0,0,\${proximity})\`}}>
        Come closer
      </button>
    </div>
  )}
</ProximityFeedback>
`;

const DemoProximity = ({ number }) => (
  <DemoContainer
    number={number}
    heading="proximity"
    name="demo-proximity"
    description="Use the distance as a proximity percentage: A value from 0 (far away) to 0.5 (halfway there) to 1 (very close)"
    code={code}
  >
    <div>
      <ProximityFeedback>
        {({ ref, proximity }) => (
          <div
            style={{
              border: '1px solid red',
              display: 'inline-block',
              padding: 35
            }}
          >
            <button
              ref={ref}
              style={{
                outline: `3px solid rgba(255,0,0,${proximity})`
              }}
            >
              Come closer
            </button>
          </div>
        )}
      </ProximityFeedback>
    </div>
  </DemoContainer>
);

DemoProximity.propTypes = {
  number: PropTypes.number.isRequired
};

export default DemoProximity;
