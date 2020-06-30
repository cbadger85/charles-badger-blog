import { graphql } from 'gatsby';
import React from 'react';
import ArticleListItem from '../components/article-list-item';
import ArticleListLayout from '../components/article-list-layout';
import SEO from '../components/seo';
import Typography from '../elements/typography';
import { BlogFrontmatter } from '../types/blog-frontmatter';

const PostsByTagPage: React.FC<PostsByTagPageProps<BlogFrontmatter>> = ({
  data,
  pathContext,
}) => {
  const posts = data.allMdx.edges;
  const { nextPageLink, prevPageLink } = pathContext;

  return (
    <>
      <SEO title={`${pathContext.category} | charlesbadger.dev`} />
      <ArticleListLayout
        nextPageLink={nextPageLink}
        prevPageLink={prevPageLink}
      >
        <div>
          <Typography component="h1" heading size="l" transform="capitalize">
            {pathContext.category} Articles
          </Typography>
          {posts.map(({ node }) => (
            <ArticleListItem
              key={node.id}
              title={node.frontmatter.title}
              slug={node.fields.slug}
              date={node.frontmatter.date}
              categories={node.fields.categories}
              excerpt={node.excerpt}
            />
          ))}
        </div>
      </ArticleListLayout>
    </>
  );
};

export default PostsByTagPage;

export const query = graphql`
  query TagPageQuery($skip: Int!, $limit: Int!, $category: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { fields: { categories: { eq: $category } } }
      sort: { order: DESC, fields: frontmatter___date }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 250)
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

interface PostsByTagPageProps<T> {
  data: {
    allMdx: {
      edges: {
        node: {
          id: string;
          excerpt: string;
          fields: { slug: string; categories: string[] };
          frontmatter: T;
        };
      }[];
    };
  };
  pathContext: {
    currentPage: number;
    numPages: number;
    skip: number;
    category: string;
    categorySlug: string;
    nextPageLink?: string;
    prevPageLink?: string;
  };
}
