import React, { useContext } from 'react';
import { ThemeContext } from '../utils/color-theme';
import styles from './color-theme-toggle.module.scss';

const ColorThemeToggle: React.FC = () => {
  const { colorTheme, setColorTheme } = useContext(ThemeContext);

  const handleToggle = () => {
    setColorTheme(colorTheme === 'light' ? 'dark' : 'light');
  };

  if (!colorTheme) {
    return null;
  }

  return (
    <div
      className={styles.toggleContainer}
      aria-label={`toggle color theme to ${
        colorTheme === 'light' ? 'dark' : 'light'
      } mode`}
    >
      <input
        id="color-theme-toggle"
        type="checkbox"
        checked={colorTheme === 'dark'}
        onChange={e => setColorTheme(e.target.checked ? 'dark' : 'light')}
      />
      <div className={styles.toggle} onClick={handleToggle} />
    </div>
  );
};

export default ColorThemeToggle;
