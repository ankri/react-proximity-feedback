import React, { FunctionComponent } from 'react';
import DemoContainer, { Demo } from './DemoContainer';
import useProximtiyFeedback from '../../src/useProximityFeedback';

const code = `<ProximityFeedback>
  {({ ref }) => <button ref={ref}>First example</button>}
</ProximityFeedback>
`;

const codeHook = `const Demo = () => {
  const { ref } = useProximityFeedback();
  return (<button ref={ref}>First example</button>)
}`;

const DemoRef: FunctionComponent<Demo> = ({ number }) => {
  const { ref } = useProximtiyFeedback();

  return (
    <DemoContainer
      number={number}
      heading="ref"
      name="demo-ref"
      description="Does not do much except not logging an error."
      code={code}
      codeHooks={codeHook}
    >
      <div>
        <button ref={ref}>First example</button>
      </div>
    </DemoContainer>
  );
};

export default DemoRef;
