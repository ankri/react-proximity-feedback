import React from 'react';
import DemoContainer from './DemoContainer';
import useProximityFeedback from '../../src/useProximityFeedback';

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

const codeHooks = `const Demo = () => {
  const { ref, proximity } = useProximityFeedback();
  
  return (
    <div style={{ border: '1px solid red', display: 'inline-block', padding: 35 }}>
      <button ref={ref} style={{ outline: \`3px solid rgba(255,0,0,\${proximity})\` }}>
        Come closer
      </button>
    </div>
  );
}`;

const DemoProximity = ({ number }) => {
  const { ref, proximity } = useProximityFeedback();

  return (
    <DemoContainer
      number={number}
      heading="proximity"
      name="demo-proximity"
      description="Use the distance as a proximity percentage: A value from 0 (far away) to 0.5 (halfway there) to 1 (very close)"
      code={code}
      codeHooks={codeHooks}
    >
      <div>
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
            data-test="button-proximity"
          >
            Come closer
          </button>
        </div>
      </div>
    </DemoContainer>
  );
};

export default DemoProximity;
