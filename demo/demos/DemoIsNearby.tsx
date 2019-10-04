import React, { FunctionComponent } from 'react';
import DemoContainer, { Demo } from './DemoContainer';
import useProximtiyFeedback from '../../src/useProximityFeedback';

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

const codeHook = `const Demo = () => {
  const { ref, isNearby } = useProximityFeedback();
  
  return (
    <div
      style={{
        border: '1px solid red',
        display: 'inline-block',
        padding: 35,
        backgroundColor: isNearby ? '#EFEFEF' : '#FFF'
      }}
    >
      <button ref={ref}>
        The mouse cursor is {isNearby ? 'nearby' : 'far away'}
      </button>
    </div>
  );
}
`;

const DemoIsNearby: FunctionComponent<Demo> = ({ number }) => {
  const { ref, isNearby } = useProximtiyFeedback();

  return (
    <DemoContainer
      number={number}
      heading="isNearby"
      name="demo-is-nearby"
      description="Use the boolean value isNearby."
      code={code}
      codeHooks={codeHook}
    >
      <div>
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
      </div>
    </DemoContainer>
  );
};

export default DemoIsNearby;
