import React, { useRef, useState } from 'react';
import { FocusOn } from 'react-focus-on';
import { getClasses } from '../utils/get-classes';
import ColorThemeToggle from './color-theme-toggle';
import NavList from './nav-list';
import styles from './nav-menu.module.scss';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    buttonRef.current?.blur();
  };
  const handleClose = () => setIsOpen(false);

  return (
    <FocusOn enabled={isOpen} onEscapeKey={handleClose} autoFocus={false}>
      <button
        className={styles.hamburgerMenu}
        onClick={isOpen ? handleClose : handleOpen}
        aria-label={isOpen ? 'close' : 'menu'}
        ref={buttonRef}
        tabIndex={0}
      >
        <div className={styles.menuButtonContent} tabIndex={-1}>
          <span
            className={getClasses(
              styles.menuBar,
              isOpen && styles.menuBarOpen,
              styles.topLeft,
              isOpen && styles.topLeftOpen
            )}
          />
          <span
            className={getClasses(
              styles.menuBar,
              isOpen && styles.menuBarOpen,
              styles.topRight,
              isOpen && styles.topRightOpen
            )}
          />
          <span
            className={getClasses(
              styles.menuBar,
              isOpen && styles.menuBarOpen,
              styles.middleLeft,
              isOpen && styles.middleLeftOpen
            )}
          />
          <span
            className={getClasses(
              styles.menuBar,
              isOpen && styles.menuBarOpen,
              styles.middleRight,
              isOpen && styles.middleRightOpen
            )}
          />
          <span
            className={getClasses(
              styles.menuBar,
              isOpen && styles.menuBarOpen,
              styles.bottomLeft,
              isOpen && styles.bottomLeftOpen
            )}
          />
          <span
            className={getClasses(
              styles.menuBar,
              isOpen && styles.menuBarOpen,
              styles.bottomRight,
              isOpen && styles.bottomRightOpen
            )}
          />
        </div>
      </button>
      <div
        role="dialog"
        aria-labelledby="navigation-menu"
        className={getClasses(styles.navMenu, isOpen && styles.navMenuOpen)}
      >
        <div>
          <NavList onClick={handleClose} />
          <ColorThemeToggle />
        </div>
      </div>
    </FocusOn>
  );
};

export default NavMenu;
