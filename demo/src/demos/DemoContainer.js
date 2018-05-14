import React from 'react';
import PropTypes from 'prop-types';

const codeContainerStyle = {
  border: '1px solid #999999',
  backgroundColor: '#F0F0F0',
  padding: 10,
  overflow: 'auto'
};

const demoContainerStyle = {
  border: '1px solid #999999',
  padding: 10
};

const DemoContainer = ({
  number,
  heading,
  name,
  description,
  code,
  children
}) => (
  <section
    style={{
      borderBottom: '1px solid #777',
      paddingBottom: 20,
      paddingTop: 20
    }}
  >
    <a name={name} />
    <h2>
      Demo {number}: {heading}
    </h2>
    {description &&
      description.length > 0 && (
        <p dangerouslySetInnerHTML={{ __html: description }} />
      )}
    {code &&
      code.length > 0 && (
        <pre style={codeContainerStyle}>
          <code>{code}</code>
        </pre>
      )}
    <div style={demoContainerStyle}>{children}</div>
  </section>
);

DemoContainer.propTypes = {
  heading: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  code: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default DemoContainer;
