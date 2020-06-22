import React, { useState } from 'react';
import styles from './nav-menu.module.scss';
import { getClasses } from '../utils/getClasses';
import { FocusOn } from 'react-focus-on';
import Typography from '../elements/typography';
import { Link } from 'gatsby';
import NavList from './nav-list';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(isOpen => !isOpen);

  return (
    <FocusOn enabled={isOpen} onEscapeKey={toggleMenu} autoFocus={false}>
      <button
        className={styles.hamburgerMenu}
        onClick={toggleMenu}
        aria-label="close"
      >
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
      </button>
      <div
        role="dialog"
        aria-labelledby="navigation-menu"
        className={getClasses(styles.navMenu, isOpen && styles.navMenuOpen)}
      >
        <NavList />
      </div>
    </FocusOn>
  );
};

export default NavMenu;
