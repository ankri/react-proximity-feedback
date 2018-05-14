import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DemoContainer from './DemoContainer';
import ProximityFeedback from '../../../src/ProximityFeedback';

class Input extends Component {
  input = null;

  static propTypes = {
    proximity: PropTypes.number.isRequired
  };

  render() {
    const { proximity, ...props } = this.props;

    const outlineStyle = {
      margin: 5,
      outline:
        this.input &&
        this.input.required &&
        (!this.input.value || this.input.value.length === 0) &&
        `3px solid rgba(255,0,0, ${proximity})`
    };

    return (
      <input
        ref={component => (this.input = component)}
        style={outlineStyle}
        {...props}
      />
    );
  }
}

const DemoCodrops = ({ number }) => (
  <DemoContainer
    number={number}
    heading="codrops"
    name="demo-codrops"
    description="Based on the form example from <a href=&quot;https://tympanus.net/Development/ProximityFeedback/&quot; target=&quot;_blank&quot;>codrops</a>. View code on <a href=&quot;https://github.com/ankri/react-proximity-feedback/blob/master/demo/src/demos/DemoCodrops.js&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>GitHub</a>."
  >
    <div>
      <ProximityFeedback threshold={75} throttleInMs={5}>
        {({ ref, proximity }) => (
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
                value="Jonathan"
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
                value="202-555-0108"
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
                value="Powell Electronics Lda"
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
                value="Electronics"
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
                value="New York"
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
        )}
      </ProximityFeedback>
    </div>
  </DemoContainer>
);

DemoCodrops.propTypes = {
  number: PropTypes.number.isRequired
};

export default DemoCodrops;
