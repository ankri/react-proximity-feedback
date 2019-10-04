import React, { FunctionComponent } from 'react';
import DemoContainer, { Demo } from './DemoContainer';
import ProximityFeedback from '../../src/ProximityFeedback';

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

const DemoCodrops: FunctionComponent<Demo> = ({ number }) => (
  <DemoContainer
    number={number}
    heading="codrops"
    name="demo-codrops"
    description='Based on the form example from <a href="https://tympanus.net/Development/ProximityFeedback/" target="_blank">codrops</a>. View code on <a href="https://github.com/ankri/react-proximity-feedback/blob/master/demo/src/demos/DemoCodrops.js" target="_blank" rel="noopener noreferrer">GitHub</a>.'
  >
    <div>
      <ProximityFeedback threshold={75} throttleInMs={5}>
        {({ ref, proximity }) => {
          return (
            <form className="form" action="" method="">
              <div className="form__item">
                <label className="form__label" htmlFor="firstname">
                  First Name *
                </label>
                <Input
                  className="form__input"
                  type="text"
                  name="firstname"
                  id="firstname"
                  defaultValue="Jonathan"
                  required
                  proximity={proximity}
                />
              </div>
              <div className="form__item">
                <label className="form__label" htmlFor="lastname">
                  Last Name *
                </label>
                <Input
                  className="form__input"
                  type="text"
                  name="lastname"
                  id="lastname"
                  required
                  proximity={proximity}
                />
              </div>

              <div className="form__item">
                <label className="form__label" htmlFor="phone">
                  Phone Number
                </label>
                <Input
                  className="form__input"
                  type="tel"
                  name="phone"
                  id="phone"
                  defaultValue="202-555-0108"
                  proximity={proximity}
                />
              </div>
              <div className="form__item form__item--full">
                <label className="form__label" htmlFor="company">
                  Company Name
                </label>
                <Input
                  className="form__input"
                  type="text"
                  name="company"
                  id="company"
                  defaultValue="Powell Electronics Lda"
                  proximity={proximity}
                />
              </div>
              <div className="form__item">
                <label className="form__label" htmlFor="category">
                  Business Category
                </label>
                <Input
                  className="form__input"
                  type="text"
                  name="category"
                  id="category"
                  defaultValue="Electronics"
                  proximity={proximity}
                />
              </div>
              <div className="form__item">
                <label className="form__label" htmlFor="location">
                  Location
                </label>
                <Input
                  className="form__input"
                  type="text"
                  name="location"
                  id="location"
                  defaultValue="New York"
                  proximity={proximity}
                />
              </div>
              <div className="form__item form__item--full form__item--actions">
                <input
                  ref={ref}
                  className="form__button"
                  type="submit"
                  name="register"
                  value="Register"
                />
              </div>
            </form>
          );
        }}
      </ProximityFeedback>
    </div>
  </DemoContainer>
);

export default DemoCodrops;
