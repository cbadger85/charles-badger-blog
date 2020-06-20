import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Header from './header';
import styles from './layout.module.scss';

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

  return (
    <div>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className={styles.contents}>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
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
