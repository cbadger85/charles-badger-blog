import React from 'react';
import PaginationLinks from './pagination-links';

const ArticleListLayout: React.FC<ArticleListLayout> = ({
  prevPageLink,
  nextPageLink,
  children,
}) => {
  return (
    <div>
      <div>{children}</div>
      <PaginationLinks
        nextPageLink={nextPageLink}
        prevPageLink={prevPageLink}
      />
    </div>
  );
};

export default ArticleListLayout;

interface ArticleListLayout {
  prevPageLink?: string;
  nextPageLink?: string;
}
