import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import { BlogFrontmatter } from '../types/BlogFrontmatter';

const IndexPage: React.FC<IndexPageProps<BlogFrontmatter>> = ({ data }) => {
  const allFrontmatter = data.allMdx.edges.map(edge => edge.node.frontmatter);
  const posts = data.allMdx.edges;

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      {posts.map(({ node }) => (
        <div key={node.fields.slug}>
          <Link to={`blog/${node.fields.slug}`}>{node.frontmatter.title}</Link>
          &nbsp;
          <small>
            {' '}
            <em>published on</em> {node.frontmatter.date}
          </small>
          <p>{node.frontmatter.excerpt}</p>
          <br />
        </div>
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
    allMdx(sort: { order: DESC, fields: frontmatter___date }) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
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
      edges: { node: { fields: { slug: string }; frontmatter: T } }[];
    };
  };
}
