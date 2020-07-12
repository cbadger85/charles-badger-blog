// export * from './src/components/wrap-root-element';

const React = require('react');
const { components } = require('./src/elements/mdx-elements');
const Layout = require('./src/components/layout').default;
const { MDXProvider } = require('@mdx-js/react');
const {
  getInitialColorTheme,
  colors,
  setCssCustomProperties,
} = require('./src/utils/color-theme');

exports.wrapRootElement = ({ element }) => {
  return (
    <MDXProvider components={components}>
      <Layout>{element}</Layout>
    </MDXProvider>
  );
};

const ColorThemeScriptTag = () => {
  const codeToRunOnClient = `
    (function() {
      var getInitialColorTheme = ${String(getInitialColorTheme)};
      var colorTheme = getInitialColorTheme();

      var colors = ${JSON.stringify(colors)};

      var setCssCustomProperties = ${String(setCssCustomProperties)};
      setCssCustomProperties(colorTheme);

      window.document.documentElement.style.setProperty('--initial-color-theme', colorTheme);
    })()
  `
    .split('\n')
    .map(string => (string.trim().startsWith('//') ? '' : string.trim()))
    .join(' ')
    .split(' ')
    .map(string => string.trim())
    .join(' ');

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ColorThemeScriptTag />);
};
