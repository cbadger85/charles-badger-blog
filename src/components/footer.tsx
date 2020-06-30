import React from 'react';
import styles from './footer.module.scss';
import { Link } from 'gatsby';
import Typography from '../elements/typography';
import { Linkedin, Rss, GitHub } from 'react-feather';

const Footer = () => {
  const getCopyrightYear = () => {
    const currentYear = new Date().getFullYear();

    return currentYear === 2020 ? `${currentYear}` : `2020 - ${currentYear}`;
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContents}>
        <Link to="/" className={styles.homepageLink}>
          <Typography component="p" bold size="s" heading>
            charlesbadger.dev
          </Typography>
        </Link>
        <nav className={styles.footerNav}>
          <Typography component="h3" bold>
            Navigation
          </Typography>
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
        <div className={styles.iconContainer}>
          <div className={styles.icons}>
            <Typography component="h3" bold>
              Links
            </Typography>
            <a href="https://www.linkedin.com/in/charles-badger/">
              <Linkedin
                className={styles.icon}
                role="img"
                aria-label="linkedin"
              />
            </a>
            <a href="https://github.com/cbadger85/">
              <GitHub className={styles.icon} role="img" aria-label="github" />
            </a>
            <Link to="/rss.xml">
              <Rss className={styles.icon} role="img" aria-label="rss" />
            </Link>
          </div>
        </div>
        <Typography component="p" size="xxs" className={styles.copyright}>
          © {getCopyrightYear()} Charles Badger. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
