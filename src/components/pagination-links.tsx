import React from 'react';
import { Link } from 'gatsby';
import styles from './pagination-links.module.scss';
import { getClasses } from '../utils/getClasses';

const PaginationLinks: React.FC<PaginationLinksProps> = ({
  prevPageLink,
  prevPageText = 'Previous Page',
  nextPageLink,
  nextPageText = 'Next Page',
}) => {
  return (
    <div
      className={getClasses(
        styles.paginationLinks,
        !prevPageLink && styles.onlyNextLinkPaginationLinks
      )}
    >
      {prevPageLink && (
        <div
          className={getClasses(styles.linkContainer, styles.prevLinkContainer)}
        >
          <Link to={prevPageLink} className={styles.link}>
            <i
              role="img"
              aria-label="point-right"
              className={styles.arrowLeft}
            />
            {prevPageText}
          </Link>
        </div>
      )}
      {nextPageLink && (
        <div
          className={getClasses(styles.linkContainer, styles.nextLinkContainer)}
        >
          <Link to={nextPageLink} className={styles.link}>
            {nextPageText}
            <i
              role="img"
              aria-label="point-right"
              className={styles.arrowRight}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaginationLinks;

interface PaginationLinksProps {
  prevPageLink?: string;
  prevPageText?: string;
  nextPageLink?: string;
  nextPageText?: string;
}
