import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import { components } from '../elements/mdx-elements';
import Layout from './layout';

export const wrapRootElement: React.FC<WrapRootElementProps> = ({
  element,
}) => (
  <MDXProvider components={components}>
    <Layout>{element}</Layout>
  </MDXProvider>
);

interface WrapRootElementProps {
  element: JSX.Element;
}
