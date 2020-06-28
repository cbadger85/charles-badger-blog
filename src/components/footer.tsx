import React from 'react';
import styles from './footer.module.scss';
import { Link } from 'gatsby';
import Typography from '../elements/typography';
import { Linkedin, Rss, GitHub } from 'react-feather';

const Footer = () => {
  const getCopywrightYear = () => {
    const currentYear = new Date().getFullYear();

    return currentYear === 2020 ? `${currentYear}` : `2020 - ${currentYear}`;
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContents}>
        <div className={styles.footerLeft}>
          <Link to="/" className={styles.homepageLink}>
            <Typography component="p" bold size="s" heading>
              charlesbadger.dev
            </Typography>
          </Link>
          <Typography component="p" size="xxs">
            © {getCopywrightYear()} Charles Badger. All rights reserved.
          </Typography>
        </div>
        <div className={styles.footerRight}>
          <div>
            <Typography component="h2" bold>
              Navigation
            </Typography>
            <nav>
              <ul className={styles.footerNavList}>
                <li className={styles.footerNavListItem}>
                  <Link to="/" className={styles.footerNavLink}>
                    <Typography size="xxs">Home</Typography>
                  </Link>
                </li>
                <li className={styles.footerNavListItem}>
                  <Link to="/" className={styles.footerNavLink}>
                    <Typography size="xxs">Blog</Typography>
                  </Link>
                </li>
                <li className={styles.footerNavListItem}>
                  <Link to="/" className={styles.footerNavLink}>
                    <Typography size="xxs">About</Typography>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.iconContainer}>
            <Typography component="h2" bold>
              Links
            </Typography>
            <Linkedin className={styles.icon} />
            <GitHub className={styles.icon} />
            <Rss className={styles.icon} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
