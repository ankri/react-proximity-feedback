import React from 'react';
import DemoContainer from './DemoContainer';
import ProximityFeedback from '../../../src/ProximityFeedback';

const code = `<ProximityFeedback>
  {({ ref }) => <button ref={ref}>First example</button>}
</ProximityFeedback>
`;

export default function() {
  return (
    <DemoContainer
      heading="Demo 1: ref"
      name="demo-ref"
      description="First demo. Does not do much except not logging an error."
      code={code}
    >
      <div>
        <ProximityFeedback>
          {({ ref }) => <button ref={ref}>First example</button>}
        </ProximityFeedback>
      </div>
    </DemoContainer>
  );
}
