import React, { FunctionComponent } from 'react';
import DemoContainer from './DemoContainer';
import { Demo } from './DemoContainer';

import useProximityFeedback from '../../src/useProximityFeedback';

const code = `<ProximityFeedback>
  {
    ({ref, distance}) => <button ref={ref}>The mouse cursor is {distance}px away</button>
  }
</ProximityFeedback>
`;

const codeHook = `
const Demo = () => {
  const { ref, distance } = useProximityFeedback();
  return (<button ref={ref}>The mouse cursor is {distance}px away</button>)
}
`;

const DemoDistance: FunctionComponent<Demo> = ({ number }) => {
  const { distance, ref } = useProximityFeedback();

  return (
    <DemoContainer
      number={number}
      heading="distance"
      name="demo-distance"
      description="Display the distance between the cursor and the component."
      code={code}
      codeHooks={codeHook}
    >
      <div>
        <button ref={ref} data-test="button-distance">
          The mouse cursor is {distance}px away
        </button>
      </div>
    </DemoContainer>
  );
};

export default DemoDistance;
