import { graphql } from 'gatsby';
import React from 'react';
import ArticleListItem from '../components/article-list-item';
import SEO from '../components/seo';
import Typography from '../elements/typography';
import { BlogFrontmatter } from '../types/blog-frontmatter';

const IndexPage: React.FC<IndexPageProps<BlogFrontmatter>> = ({ data }) => {
  const posts = data.allMdx.edges;

  return (
    <>
      <SEO title="Home | charlesbadger.dev" />
      <Typography component="h1" heading size="l">
        Most Recent Articles
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
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { order: DESC, fields: frontmatter___date }, limit: 10) {
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

interface IndexPageProps<T> {
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
}
