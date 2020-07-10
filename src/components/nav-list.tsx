import React from 'react';
import styles from './nav-list.module.scss';
import { Link } from 'gatsby';
import { getClasses } from '../utils/getClasses';
import Typography from '../elements/typography';

const NavList: React.FC<NavListProps> = ({ isBar, onClick }) => {
  return (
    <nav aria-label="Primary">
      {!isBar && (
        <Typography component="span" size="xl" heading id="navigation-menu">
          Menu
        </Typography>
      )}
      <ul className={getClasses(styles.navList, isBar && styles.navListBar)}>
        {!isBar && (
          <li
            className={getClasses(styles.navItem, isBar && styles.navItemBar)}
          >
            <Link to="/" onClick={onClick}>
              <Typography
                component="span"
                bold
                size={isBar ? 's' : 'm'}
                className={styles.navItemColor}
              >
                Home
              </Typography>
            </Link>
          </li>
        )}
        <li className={getClasses(styles.navItem, isBar && styles.navItemBar)}>
          <Link to="/blog" onClick={onClick}>
            <Typography
              component="span"
              bold
              size={isBar ? 's' : 'm'}
              className={styles.navItemColor}
            >
              Blog
            </Typography>
          </Link>
        </li>
        <li className={getClasses(styles.navItem, isBar && styles.navItemBar)}>
          <Link to="/about" onClick={onClick}>
            <Typography
              component="span"
              bold
              size={isBar ? 's' : 'm'}
              className={styles.navItemColor}
            >
              About
            </Typography>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavList;

interface NavListProps {
  isBar?: boolean;
  onClick?: () => void;
}
