import { graphql, PageProps } from 'gatsby';
import React from 'react';
import ArticleListItem from '../components/article-list-item';
import ArticleListLayout from '../components/article-list-layout';
import SEO from '../components/seo';
import Typography from '../elements/typography';

const BlogListPage: React.FC<BlogListPageProps> = ({ data, pathContext }) => {
  const posts = data.allMdx.edges;

  const { nextPageLink, prevPageLink } = pathContext;

  return (
    <>
      <SEO title="Blog | charlesbadger.dev" />
      <ArticleListLayout
        nextPageLink={nextPageLink}
        prevPageLink={prevPageLink}
      >
        <div>
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
              excerpt={node.excerpt}
            />
          ))}
        </div>
      </ArticleListLayout>
    </>
  );
};

export default BlogListPage;

export const query = graphql`
  query ListPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { page: { ne: "about" } } }
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

interface BlogListPageProps extends PageProps {
  data: {
    allMdx: {
      edges: {
        node: {
          id: string;
          excerpt: string;
          fields: { slug: string; categories: string[] };
          frontmatter: {
            title: string;
            date: string;
          };
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
