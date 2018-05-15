import React from 'react';
import ProximityFeedback from '../src/ProximityFeedback';
import ReactTestUtils from 'react-dom/test-utils';

jest.useFakeTimers();

// https://github.com/mzabriskie/react-draggable/blob/master/specs/draggable.spec.jsx#L702
function mouseMove(x, y, node) {
  const doc = node ? node.ownerDocument : document;
  const evt = doc.createEvent('MouseEvents');
  evt.initMouseEvent(
    'mousemove',
    true,
    true,
    window,
    0,
    0,
    0,
    x,
    y,
    false,
    false,
    false,
    false,
    0,
    null
  );
  doc.dispatchEvent(evt);
  return evt;
}

describe('Test ProximityFeedback', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  it('should throw error when no ref has been provided', () => {
    const render = () => {
      ReactTestUtils.renderIntoDocument(
        <ProximityFeedback>{() => <button>Test</button>}</ProximityFeedback>
      );
    };

    expect(render).toThrowErrorMatchingSnapshot();
  });

  it('should not throw error when ref has been provided', () => {
    const text = 'Test';
    const wrapper = ReactTestUtils.renderIntoDocument(
      <ProximityFeedback>
        {({ ref }) => <button ref={ref}>{text}</button>}
      </ProximityFeedback>
    );
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(
      wrapper,
      'button'
    );

    expect(button.innerHTML).toEqual(text);
  });

  describe('test render prop distance y-axis', () => {
    [100, -100, 80, -80, 60, -60, 40, -40, 20, -20, 0].forEach(distance => {
      it(`should show correct distance: ${distance}`, () => {
        let cursorDistance = -1;
        ReactTestUtils.renderIntoDocument(
          <ProximityFeedback>
            {({ ref, distance }) => {
              cursorDistance = distance;
              return <button ref={ref}>{distance}</button>;
            }}
          </ProximityFeedback>
        );

        mouseMove(0, distance);
        jest.runOnlyPendingTimers();
        expect(cursorDistance).toEqual(Math.abs(distance));
      });
    });
  });

  describe('test render prop distance x-axis', () => {
    [100, -100, 80, -80, 60, -60, 40, -40, 20, -20, 0].forEach(distance => {
      it(`should show correct distance: ${distance}`, () => {
        let cursorDistance = -1;
        ReactTestUtils.renderIntoDocument(
          <ProximityFeedback>
            {({ ref, distance }) => {
              cursorDistance = distance;
              return <button ref={ref}>{distance}</button>;
            }}
          </ProximityFeedback>
        );

        mouseMove(distance, 0);
        jest.runOnlyPendingTimers();
        expect(cursorDistance).toEqual(Math.abs(distance));
      });
    });
  });

  describe('test render prop isNearby', () => {
    [100, 60, 35, 34, 30, 20, 0].forEach(distance => {
      it(`should provide correct value for isNearby for distance: ${distance}`, () => {
        let isCursorNearby = false;
        ReactTestUtils.renderIntoDocument(
          <ProximityFeedback>
            {({ ref, isNearby }) => {
              isCursorNearby = isNearby;
              return <button ref={ref}>Test</button>;
            }}
          </ProximityFeedback>
        );

        mouseMove(0, distance);

        jest.runOnlyPendingTimers();
        expect(isCursorNearby).toEqual(distance <= 35);
      });
    });
  });

  describe('test render prop proximity', () => {
    [
      { distance: 100, expected: 0 },
      { distance: 60, expected: 0 },
      { distance: 35, expected: 0 },
      { distance: 30, expected: 0.14 },
      { distance: 14, expected: 0.6 },
      { distance: 0, expected: 1 }
    ].forEach(({ distance, expected }) => {
      it(`should provide correct value for proximity for distance: ${distance}`, () => {
        let cursorProximity = -1;
        ReactTestUtils.renderIntoDocument(
          <ProximityFeedback>
            {({ ref, proximity }) => {
              cursorProximity = proximity;
              return <button ref={ref}>Test</button>;
            }}
          </ProximityFeedback>
        );

        mouseMove(0, distance);

        jest.runOnlyPendingTimers();
        expect(cursorProximity).toEqual(expected);
      });
    });
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });
});
