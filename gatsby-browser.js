import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import Layout from './src/components/layout';
import { components } from './src/elements/mdx-elements';
import './src/styles/index.scss';

export const wrapRootElement = ({ element }) => {
  return (
    <MDXProvider components={components}>
      <Layout>{element}</Layout>
    </MDXProvider>
  );
};
