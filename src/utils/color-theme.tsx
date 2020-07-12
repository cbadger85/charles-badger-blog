import React, { useEffect, useState } from 'react';

type ColorTheme = 'light' | 'dark';

interface ThemeContextState {
  colorTheme?: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

export const colors = {
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

export const getInitialColorTheme = () => {
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

// Typescript ignored for this function so it can be stringified in the
// gatsby-ssr file and ran on the client.
// @ts-ignore
export const setCssCustomProperties = theme => {
  const root = window.document.documentElement;
  Object.keys(colors).forEach(property => {
    // @ts-ignore
    root.style.setProperty(property, colors[property][theme]);
  });
};

export const ThemeContext = React.createContext<ThemeContextState>({
  colorTheme: 'light',
  setColorTheme: theme => null,
});

export const ThemeProvider: React.FC = ({ children }) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>();

  useEffect(() => {
    const root = window.document.documentElement;

    const intialColorTheme = root.style.getPropertyValue(
      '--initial-color-theme'
    );

    setColorTheme(intialColorTheme as ColorTheme);
  }, []);

  const handleSetColorTheme = (theme: ColorTheme) => {
    setColorTheme(theme);

    window.localStorage.setItem('color-mode', theme);

    setCssCustomProperties(theme);
  };

  return (
    <ThemeContext.Provider
      value={{ colorTheme, setColorTheme: handleSetColorTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
