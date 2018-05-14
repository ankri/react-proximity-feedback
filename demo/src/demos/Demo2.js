import React from 'react';
import DemoContainer from './DemoContainer';
import ProximityFeedback from '../../../src/ProximityFeedback';

const code = `<ProximityFeedback>
  {
    ({ref, distance}) => <button ref={ref}>The mouse cursor is {distance}px away</button>
  }
</ProximityFeedback>
`;

export default function() {
  return (
    <DemoContainer
      heading="Demo 2: distance"
      name="demo-distance"
      description="Second example. Display the distance between the cursor and the component."
      code={code}
    >
      <div>
        <ProximityFeedback>
          {({ ref, distance }) => (
            <button ref={ref}>The mouse cursor is {distance}px away</button>
          )}
        </ProximityFeedback>
      </div>
    </DemoContainer>
  );
}
