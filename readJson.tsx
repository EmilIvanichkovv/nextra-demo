import JSONData from './assets/example-contract-data.json';
// Import necessary packages
// import React from 'react';
// import * as fs from 'fs';
// import path from 'path';

import React from 'react';

// Define the types according to your JSON structure
interface MethodParams {
  [key: string]: string;
}

interface MethodReturns {
  [key: string]: string;
}

interface MethodDetails {
  details: string;
  params?: MethodParams;
  returns?: MethodReturns;
}

interface Methods {
  [key: string]: MethodDetails;
}

interface Data {
  author: string;
  details: string;
  kind: string;
  methods: Methods;
  title: string;
  version: number;
}

// React components to display the JSON data
const MethodDetailsComponent: React.FC<{ method: MethodDetails }> = ({
  method,
}) => (
  <div style={{ marginBottom: '20px' }}>
    <p>
      <strong>Details:</strong> {method.details}
    </p>
    {method.params && (
      <div>
        <strong>Parameters:</strong>
        <ul>
          {Object.entries(method.params).map(([param, desc]) => (
            <li key={param}>
              <strong>{param}:</strong> {desc}
            </li>
          ))}
        </ul>
      </div>
    )}
    {method.returns && (
      <div>
        <strong>Returns:</strong>
        <ul>
          {Object.entries(method.returns).map(([ret, desc]) => (
            <li key={ret}>
              <strong>{ret}:</strong> {desc}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const JsonDisplay: React.FC<{ data: Data }> = ({ data }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
    <h1 style={{ color: '#4CAF50' }}>{data.title}</h1>
    <p>
      <strong>Author:</strong> {data.author}
    </p>
    <p>
      <strong>Version:</strong> {data.version}
    </p>
    <p>
      <strong>Kind:</strong> {data.kind}
    </p>
    <p>
      <strong>Details:</strong> {data.details}
    </p>

    <h2>Methods</h2>
    {Object.entries(data.methods).map(([methodName, methodDetails]) => (
      <div
        key={methodName}
        style={{
          borderBottom: '1px solid #ddd',
          paddingBottom: '10px',
          marginBottom: '10px',
        }}
      >
        <h3 style={{ color: '#2196F3' }}>{methodName}</h3>
        <MethodDetailsComponent method={methodDetails} />
      </div>
    ))}
  </div>
);

// Function to get the JSON data and return the component
export const getJsonComponent = async (): Promise<React.ReactElement> => {
  const data = JSONData;
  return <JsonDisplay data={data} />;
};
