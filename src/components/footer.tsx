import React from 'react';
import styles from './footer.module.scss';
import { Link } from 'gatsby';
import Typography from './typography';
import { Linkedin, Rss, GitHub } from 'react-feather';
import { getClasses } from '../utils/get-classes';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Footer = () => {
  const isSmallPhone = useMediaQuery(400);
  const headerSize = isSmallPhone ? 'xs' : 's';

  const getCopyrightYear = () => {
    const currentYear = new Date().getFullYear();

    return currentYear === 2020 ? `${currentYear}` : `2020 - ${currentYear}`;
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContents}>
        <span className={styles.homePageLinkContainer}>
          <Link to="/" className={styles.homepageLink}>
            <Typography component="p" bold size={headerSize} heading>
              charlesbadger.dev
            </Typography>
          </Link>
        </span>
        <nav className={styles.footerNav} aria-label="Secondary">
          <Typography
            component="span"
            size={headerSize}
            bold
            className={styles.footerNavText}
          >
            Navigation
          </Typography>
          <ul className={styles.footerNavList}>
            <li className={styles.footerNavListItem}>
              <Link to="/" className={styles.footerNavLink}>
                <Typography size="xs" className={styles.footerNavText}>
                  Home
                </Typography>
              </Link>
            </li>
            <li className={styles.footerNavListItem}>
              <Link to="/" className={styles.footerNavLink}>
                <Typography size="xs" className={styles.footerNavText}>
                  Blog
                </Typography>
              </Link>
            </li>
            <li className={styles.footerNavListItem}>
              <Link to="/" className={styles.footerNavLink}>
                <Typography size="xs" className={styles.footerNavText}>
                  About
                </Typography>
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.iconContainer}>
          <section className={styles.icons} aria-labelledby="footer-links">
            <Typography
              component="span"
              bold
              id="footer-links"
              size={headerSize}
              className={getClasses(
                styles.footerNavText,
                styles.footerLinksHeading
              )}
            >
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
          </section>
        </div>
        <Typography component="p" size="xxs" className={styles.copyright}>
          © {getCopyrightYear()} Charles Badger. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
