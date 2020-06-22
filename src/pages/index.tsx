import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import GatsbyImage from '../components/gatsby-image';
import SEO from '../components/seo';
import { BlogFrontmatter } from '../types/blog-frontmatter';
import Typography from '../elements/typography';
import ArticleListItem from '../components/article-list-item';

const IndexPage: React.FC<IndexPageProps<BlogFrontmatter>> = ({ data }) => {
  const posts = data.allMdx.edges;

  return (
    <Layout>
      <SEO title="Home" />
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
        />
      ))}
    </Layout>
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
}
