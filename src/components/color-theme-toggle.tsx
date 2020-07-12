import React, { useContext } from 'react';
import { ThemeContext } from '../utils/color-theme';

const ColorThemeToggle = () => {
  const { colorTheme, setColorTheme } = useContext(ThemeContext);

  if (!colorTheme) {
    return null;
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={colorTheme === 'dark'}
        onChange={e => setColorTheme(e.target.checked ? 'dark' : 'light')}
      />{' '}
      Dark
    </label>
  );
};

export default ColorThemeToggle;
