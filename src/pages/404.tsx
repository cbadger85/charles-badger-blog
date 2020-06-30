import React from 'react';
import SEO from '../components/seo';
import { graphql, PageProps, Link } from 'gatsby';
import { findBestMatch } from 'string-similarity';
import Typography from '../elements/typography';
import styles from './404.module.scss';

const NotFoundPage: React.FC<PageProps<Data>> = ({ data, location }) => {
  const pagePaths = data.allSitePage.nodes.map(node => node.path);
  const currentPath = location.pathname;

  const result = findBestMatch(currentPath, pagePaths).bestMatch;
  const isResultGoodMatch = result.rating > 0.7;

  return (
    <>
      <SEO title="404 | charlesbadger.dev" />
      <Typography component="h2" heading size="l" className={styles.title}>
        Not Found
      </Typography>
      <Typography component="p" size="m">
        The page you're looking for does not exist.
      </Typography>
      {isResultGoodMatch && (
        <div className={styles.bestResult}>
          <Typography component="p">
            Is this what you were looking for?
          </Typography>
          <Link to={result.target}>
            <Typography component="span" link>
              {result.target.slice(0, -1)}
            </Typography>
          </Link>
        </div>
      )}
    </>
  );
};

export default NotFoundPage;

export const query = graphql`
  query NotFoundQuery {
    allSitePage(
      filter: { path: { nin: ["/dev-404-page", "/404/", "/404.html"] } }
    ) {
      nodes {
        path
      }
    }
  }
`;

interface Data {
  allSitePage: {
    nodes: { path: string }[];
  };
}
