import React from 'react';
import PropTypes from 'prop-types';
import DemoContainer from './DemoContainer';
import ProximityFeedback from '../../../src/ProximityFeedback';

const code = `<ProximityFeedback>
  {({ ref }) => <button ref={ref}>First example</button>}
</ProximityFeedback>
`;

const DemoRef = ({ number }) => (
  <DemoContainer
    number={number}
    heading="ref"
    name="demo-ref"
    description="Does not do much except not logging an error."
    code={code}
  >
    <div>
      <ProximityFeedback>
        {({ ref }) => <button ref={ref}>First example</button>}
      </ProximityFeedback>
    </div>
  </DemoContainer>
);

DemoRef.propTypes = {
  number: PropTypes.number.isRequired
};

export default DemoRef;
