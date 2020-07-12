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

const ColorThemeScriptTag = () => {
  const codeToRunOnClient = `
    (function() {
      function getInitialColorTheme () {
        const userColorPreference = window.localStorage.getItem('color-mode');
      
        if (userColorPreference === 'light' || userColorPreference === 'dark') {
          return userColorPreference;
        }
      
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
      
        if (mql.matches) {
          return mql.matches ? 'dark' : 'light';
        }
      
        return 'light';
      };

      const colorTheme = getInitialColorTheme();

      const colors = {
        '--background-color': {
          light: '#f5f7fa',
          dark: '#1f2933',
        },
        '--header-background-color': {
          light: '245, 247, 250',
          dark: '50, 60, 75',
        },
        '--primary-color': {
          light: '#323f4b',
          dark: '#b3ecff',
        },
        '--secondary-color': {
          light: '#323f4b',
          dark: '#da127d',
        },
        '--secondary-color-light': {
          light: '#323f4b',
          dark: '#e8368f',
        },
        '--tertiary-color': {
          light: '#323f4b',
          dark: '#fce588',
        },
        '--text-color': {
          light: '#1f2933',
          dark: '#f5f7fa',
        },
      
        '--default-color': {
          light: '#323f4b',
          dark: '#f5f7fa',
        },
        '--nav-link-color': {
          light: '#616e7c',
          dark: '#cbd2d0',
        },
        '--nav-link-color-hover': {
          light: '#1f2933',
          dark: '#f5f7fa',
        },
        '--footer-background-color': {
          light: '#181818',
          dark: '#101419',
        },
        '--hamburger-menu-color': {
          light: '#181818',
          dark: '#f5f7fa',
        },
        '--block-quote-background': {
          light: '#cbd2d9',
          dark: '#323f4b',
        },
        '--blockquote-bar-color': {
          light: '#7b8794',
          dark: '#181e25',
        },
        '--blockquote-text-color': {
          light: '#323f4b',
          dark: '#f5f7fa',
        },
        '--link-color': {
          light: '#127fbf',
          dark: '#2bb0ed',
        },
        '--link-hover-color': {
          light: '#2bb0ed',
          dark: '#53d0fa',
        },
        '--link-underline-color': {
          light: '#2bb0ed',
          dark: '#53d0fa',
        },
      };

      const root = window.document.documentElement;

      Object.keys(colors).forEach(property => {
        root.style.setProperty(property, colors[property][colorTheme]);
      });

      console.log('the color theme is ', colorTheme);

      root.style.setProperty('--initial-color-theme', colorTheme);
    })()
  `;

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<ColorThemeScriptTag />);
};
