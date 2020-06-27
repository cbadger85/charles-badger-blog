import React, { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import styles from './layout.module.scss';
import debounce from 'lodash/debounce';
import Footer from './footer';

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery<TitleQuery>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--max-height',
      `${window.innerHeight}px`
    );

    const handleResize = debounce(() => {
      document.documentElement.style.setProperty(
        '--max-height',
        `${window.innerHeight}px`
      );
    }, 250);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div className={styles.layoutContainer}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className={styles.layout}>{children}</main>
      <Footer />
    </div>
  );
};

interface TitleQuery {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

export default Layout;
