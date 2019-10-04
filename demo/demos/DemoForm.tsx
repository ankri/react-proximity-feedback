import React, { Component, FunctionComponent } from 'react';
import DemoContainer, { Demo } from './DemoContainer';
import useProximtiyFeedback from '../../src/useProximityFeedback';

const Input = ({
  proximity,
  ...props
}: { proximity: number } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  const ref = React.useRef(null);

  const outlineStyle = {
    margin: 5,
    outline:
      ref.current &&
      ref.current.required &&
      (!ref.current.value || ref.current.value.length === 0) &&
      `3px solid rgba(255,0,0, ${proximity})`
  };

  return <input ref={ref} style={outlineStyle} {...props} />;
};

const DemoForm: FunctionComponent<Demo> = ({ number }) => {
  const { ref, proximity } = useProximtiyFeedback();
  return (
    <DemoContainer
      number={number}
      heading="form"
      name="demo-form"
      description='A "real-life" example. Display an outline on the required inputs when they are invalid. View code on <a href="https://github.com/ankri/react-proximity-feedback/blob/master/demo/src/demos/DemoForm.js" target="_blank" rel="noopener noreferrer">GitHub</a>'
    >
      <div>
        <form>
          <div>
            <label>
              First name
              <Input proximity={proximity} required />
            </label>
          </div>
          <div>
            <label>
              Last name
              <Input proximity={proximity} required />
            </label>
          </div>
          <div>
            <button
              type="submit"
              ref={ref}
              style={{ cursor: 'pointer' }}
              data-test="button-form"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </DemoContainer>
  );
};

export default DemoForm;
