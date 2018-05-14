import React from 'react';
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

export default function({ number }) {
  return (
    <DemoContainer
      number={number}
      heading="isNearby"
      name="demo-is-near"
      description="Use the boolean value of isNearby."
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
              <button ref={ref}>
                The mouse cursor is {isNearby ? 'nearby' : 'far away'}
              </button>
            </div>
          )}
        </ProximityFeedback>
      </div>
    </DemoContainer>
  );
}
