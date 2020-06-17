import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from './src/components/code-block';

const preToCodeBlock = preProps => {
  if (preProps.children?.props?.mdxType === 'code') {
    return <CodeBlock {...preProps.children.props} />;
  }

  return <pre {...preProps} />;
};

const components = {
  pre: preToCodeBlock,
};

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);
