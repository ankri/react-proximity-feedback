import React, { Component } from 'react';
import DemoContainer from './DemoContainer';
import ProximityFeedback from '../../../src/ProximityFeedback';

class Input extends Component {
  input = null;

  render() {
    const { proximity, ...props } = this.props;

    const outlineStyle = {
      margin: 5,
      outline:
        this.input &&
        this.input.required &&
        (!this.input.value || this.input.value.length === 0) &&
        `1px solid rgba(255,0,0, ${proximity})`
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

export default class Demo6 extends Component {
  render() {
    return (
      <DemoContainer
        number={this.props.number}
        heading="Demo 6: Form"
        name="demo-form"
        description="A &quot;real-life&quot; example. Display an outline on the required inputs when they are invalid. For code check the <a href=&quot;&quot; target=&quot;_blank&quot;>GitHub</a>"
      >
        <div>
          <ProximityFeedback>
            {({ ref, proximity }) => (
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
                  <button type="submit" ref={ref} style={{ cursor: 'pointer' }}>
                    Submit
                  </button>
                </div>
              </form>
            )}
          </ProximityFeedback>
        </div>
      </DemoContainer>
    );
  }
}
