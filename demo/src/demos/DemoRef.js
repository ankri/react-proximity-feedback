import React from 'react';
import DemoContainer from './DemoContainer';
import ProximityFeedback from '../../../src/ProximityFeedback';

const code = `<ProximityFeedback>
  {({ ref }) => <button ref={ref}>First example</button>}
</ProximityFeedback>
`;

export default function({ number }) {
  return (
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
}
