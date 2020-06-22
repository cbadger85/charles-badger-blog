import React from 'react';
import styles from './nav-list.module.scss';
import { Link } from 'gatsby';
import { getClasses } from '../utils/getClasses';
import Typography from '../elements/typography';

const NavList: React.FC<NavListProps> = ({ isBar, onClick }) => {
  return (
    <nav>
      {!isBar && (
        <Typography component="h1" size="xl" heading id="navigation-menu">
          Menu
        </Typography>
      )}
      <ul className={getClasses(styles.navList, isBar && styles.navListBar)}>
        {!isBar && (
          <li
            className={getClasses(styles.navItem, isBar && styles.navItemBar)}
          >
            <Link to="/" onClick={onClick}>
              <Typography component="span" bold size={isBar ? 's' : 'm'}>
                Home
              </Typography>
            </Link>
          </li>
        )}
        <li className={getClasses(styles.navItem, isBar && styles.navItemBar)}>
          <Link to="/blog" onClick={onClick}>
            <Typography component="span" bold size={isBar ? 's' : 'm'}>
              Blog
            </Typography>
          </Link>
        </li>
        <li className={getClasses(styles.navItem, isBar && styles.navItemBar)}>
          <Link to="/about" onClick={onClick}>
            <Typography component="span" bold size={isBar ? 's' : 'm'}>
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
