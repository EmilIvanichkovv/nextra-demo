import React, { createContext, useContext, useState, useEffect } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { getJsonComponent } from '../readJson';

// Create a context for the JSON data
const JsonDataContext = createContext<any>(null);

export const JsonDataProvider: React.FC<{ children: string }> = ({
  children,
}) => {
  const [jsonComponent, setJsonComponent] = useState<React.ReactElement | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      const component = await getJsonComponent();
      setJsonComponent(component);
    })();
  }, []);

  return (
    <JsonDataContext.Provider value={jsonComponent}>
      {children}
    </JsonDataContext.Provider>
  );
};

// Custom component to use in MDX files
export const JsonDataComponent: React.FC = () => {
  const jsonComponent = useContext(JsonDataContext);
  return jsonComponent ? jsonComponent : <p>Loading...</p>;
};

// Custom components mapping
const components = {
  JsonDataComponent,
};

export const MdxProvider: React.FC<{ children: string }> = ({ children }) => {
  console.log(children);
  return (
    <MDXProvider components={components}>
      <JsonDataProvider>{children}</JsonDataProvider>
    </MDXProvider>
  );
};

export default MdxProvider;
