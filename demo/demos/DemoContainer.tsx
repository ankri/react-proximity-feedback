import React, { FunctionComponent } from 'react';

export interface Demo {
  number: number;
}

interface DemoContainerProps {
  number: number;
  heading: string;
  name: string;
  description?: string;
  code?: string;
  codeHooks?: string;
}

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

const DemoContainer: FunctionComponent<DemoContainerProps> = ({
  number,
  heading,
  name,
  description,
  code,
  codeHooks: codeHook,
  children
}) => {
  const [showHooksCode, setShowHooksCode] = React.useState(true);

  return (
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
      {description && description.length > 0 && (
        <p dangerouslySetInnerHTML={{ __html: description }} />
      )}

      {(codeHook || code) && (
        <div>
          <button
            disabled={showHooksCode}
            onClick={() => {
              setShowHooksCode(true);
            }}
          >
            using hooks
          </button>
          <button
            disabled={!showHooksCode}
            onClick={() => {
              setShowHooksCode(false);
            }}
          >
            using component
          </button>
        </div>
      )}

      {showHooksCode && codeHook && codeHook.length > 0 && (
        <pre style={codeContainerStyle}>
          <code>{codeHook}</code>
        </pre>
      )}

      {!showHooksCode && code && code.length > 0 && (
        <pre style={codeContainerStyle}>
          <code>{code}</code>
        </pre>
      )}
      <div style={demoContainerStyle}>{children}</div>
    </section>
  );
};

export default DemoContainer;
