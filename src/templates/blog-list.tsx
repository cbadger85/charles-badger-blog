import { graphql, Link } from 'gatsby';
import React from 'react';
import SEO from '../components/seo';
import { BlogFrontmatter } from '../types/blog-frontmatter';
import Typography from '../elements/typography';
import ArticleListItem from '../components/article-list-item';

const IndexPage: React.FC<IndexPageProps<BlogFrontmatter>> = ({
  data,
  pathContext,
}) => {
  const posts = data.allMdx.edges;

  const { nextPageLink, prevPageLink } = pathContext;

  return (
    <>
      <SEO title="Blog" />
      <Typography component="h1" heading size="l">
        Articles
      </Typography>
      {posts.map(({ node }) => (
        <ArticleListItem
          key={node.id}
          title={node.frontmatter.title}
          slug={node.fields.slug}
          date={node.frontmatter.date}
          categories={node.fields.categories}
        />
      ))}
      {prevPageLink && (
        <p>
          <Link to={prevPageLink}>
            <span role="img" aria-label="point-left">
              👈 Prev Page
            </span>
            Previous
          </Link>
        </p>
      )}
      {nextPageLink && (
        <p>
          <Link to={nextPageLink}>
            <span role="img" aria-label="point-left">
              Next Page 👉
            </span>
            Next
          </Link>
        </p>
      )}
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query ListPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
            categories
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`;

interface IndexPageProps<T> {
  data: {
    allMdx: {
      edges: {
        node: {
          id: string;
          fields: { slug: string; categories: string[] };
          frontmatter: T;
        };
      }[];
    };
  };
  pathContext: {
    currentPage: number;
    limit: number;
    numPages: number;
    skip: number;
    nextPageLink?: string;
    prevPageLink?: string;
  };
}
