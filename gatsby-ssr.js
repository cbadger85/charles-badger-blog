// export * from './src/components/wrap-root-element';

const React = require('react');
const { components } = require('./src/elements/mdx-elements');
const Layout = require('./src/components/layout').default;
const { MDXProvider } = require('@mdx-js/react');

exports.wrapRootElement = ({ element }) => {
  return (
    <MDXProvider components={components}>
      <Layout>{element}</Layout>
    </MDXProvider>
  );
};
