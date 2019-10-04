import React, { FunctionComponent } from 'react';
import DemoContainer, { Demo } from './DemoContainer';
import useProximtiyFeedback from '../../src/useProximityFeedback';

const code = `const customThreshold = 50;

<ProximityFeedback threshold={customThreshold}>
  {({ ref, isNearby }) => (
    <div style={{ border: '1px solid red', display: 'inline-block', padding: customThreshold }}>
      <button ref={ref}>
        The mouse cursor is {isNearby ? 'nearby' : 'far away'}
      </button>
    </div>
  )}
</ProximityFeedback>
`;

const codeHooks = `const Demo = () => {
  const customThreshold = 50;
  const { ref, isNearby } = useProximityFeedback({ threshold: customThreshold });
  
  return (
    <div style={{ border: '1px solid red', display: 'inline-block', padding: customThreshold }}>
      <button ref={ref}>
        The mouse cursor is {isNearby ? 'nearby' : 'far away'}
      </button>
    </div>
  );
}`;

const DemoThreshold: FunctionComponent<Demo> = ({ number }) => {
  const [threshold, setThreshold] = React.useState(100);
  const { ref, isNearby } = useProximtiyFeedback({
    threshold
  });

  return (
    <DemoContainer
      number={number}
      heading="props threshold"
      name="demo-props-threshold"
      description='Change threshold. View code on <a href="https://github.com/ankri/react-proximity-feedback/blob/master/demo/src/demos/DemoPropsthreshold.js" target="_blank" rel="noopener noreferrer">GitHub</a>'
      code={code}
      codeHooks={codeHooks}
    >
      <div>
        <div style={{ marginBottom: 10 }}>
          <label>
            Change threshold{' '}
            <input
              type="number"
              onBlur={event => {
                setThreshold(parseInt(event.target.value, 10));
              }}
              defaultValue={threshold}
              data-test="input-props-threshold"
            />
          </label>
        </div>
        <div>
          <div
            style={{
              border: '1px solid red',
              display: 'inline-block',
              padding: threshold
            }}
          >
            <button ref={ref} data-test="button-props-threshold">
              The mouse cursor is {isNearby ? 'nearby' : 'far away'}
            </button>
          </div>
        </div>
      </div>
    </DemoContainer>
  );
};

export default DemoThreshold;
