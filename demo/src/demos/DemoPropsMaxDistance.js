import React, { Component } from 'react';
import DemoContainer from './DemoContainer';
import ProximityFeedback from '../../../src/ProximityFeedback';

export default class Demo5 extends Component {
  state = {
    maxDistance: 100
  };

  changeMaxDistance = event => {
    try {
      const maxDistance = parseInt(event.target.value, 10);
      this.setState({
        maxDistance: Math.abs(event.target.value) || 0
      });
    } catch (e) {
      this.setState({
        maxDistance: 0
      });
    }
  };

  render() {
    return (
      <DemoContainer
        number={this.props.number}
        heading="Demo 5: props maxDistance"
        name="demo-props-max-distance"
        description="Change maxDistance. Code see <a href=&quot;&quot; target=&quot;_blank&quot;>GitHub</a>"
      >
        <div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Change the max distance
              <input
                type="number"
                onBlur={this.changeMaxDistance}
                defaultValue={this.state.maxDistance}
              />
            </label>
          </div>
          <div>
            <ProximityFeedback maxDistance={this.state.maxDistance}>
              {({ ref, isNearby }) => (
                <div
                  style={{
                    border: '1px solid red',
                    display: 'inline-block',
                    padding: this.state.maxDistance
                  }}
                >
                  <button ref={ref}>
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
