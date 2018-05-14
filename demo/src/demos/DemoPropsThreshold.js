import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DemoContainer from './DemoContainer';
import ProximityFeedback from '../../../src/ProximityFeedback';

export default class DemoThreshold extends Component {
  state = {
    threshold: 100
  };

  static propTypes = {
    number: PropTypes.number.isRequired
  };

  changeThreshold = event => {
    try {
      const threshold = parseInt(event.target.value, 10);
      this.setState({
        threshold: Math.abs(threshold) || 0
      });
    } catch (e) {
      this.setState({
        threshold: 0
      });
    }
  };

  render() {
    return (
      <DemoContainer
        number={this.props.number}
        heading="props threshold"
        name="demo-props-threshold"
        description="Change threshold. View code on <a href=&quot;https://github.com/ankri/react-proximity-feedback/blob/master/demo/src/demos/DemoPropsthreshold.js&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>GitHub</a>"
      >
        <div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Change threshold{' '}
              <input
                type="number"
                onBlur={this.changeThreshold}
                defaultValue={this.state.threshold}
                data-test="input-props-threshold"
              />
            </label>
          </div>
          <div>
            <ProximityFeedback threshold={this.state.threshold}>
              {({ ref, isNearby }) => (
                <div
                  style={{
                    border: '1px solid red',
                    display: 'inline-block',
                    padding: this.state.threshold
                  }}
                >
                  <button ref={ref} data-test="button-props-threshold">
                    The mouse cursor is {isNearby ? 'nearby' : 'far away'}
                  </button>
                </div>
              )}
            </ProximityFeedback>
          </div>
        </div>
      </DemoContainer>
    );
  }
}
