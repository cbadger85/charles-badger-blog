import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import { BlogFrontmatter } from '../types/BlogFrontmatter';

const PostsByTagPage: React.FC<PostsByTagPageProps<BlogFrontmatter>> = ({
  data,
  pathContext,
}) => {
  const posts = data.allMdx.edges;
  const prev =
    pathContext.currentPage === 1 ? null : pathContext.currentPage - 1;
  const next =
    pathContext.currentPage === pathContext.numPages
      ? null
      : pathContext.currentPage + 1;
  const { tag } = pathContext;

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
          <Link to={`/blog/posts${node.fields.slug}`}>
            {node.frontmatter.title}
          </Link>
          &nbsp;
          <small>
            {' '}
            <em>published on</em> {node.frontmatter.date}
          </small>
          <p>{node.frontmatter.excerpt}</p>
          <br />
          <p>
            {prev && (
              <Link to={`/blog/tags/${tag}/${prev}`}>
                {prev}{' '}
                <span role="img" aria-label="point-left">
                  👈{' '}
                </span>
                Previous
              </Link>
            )}
          </p>
          <p>
            {next && (
              <Link to={`/blog/tags/${tag}/${next}`}>
                {next}{' '}
                <span role="img" aria-label="point-left">
                  👉{' '}
                </span>
                Next
              </Link>
            )}
          </p>
        </div>
      ))}
    </Layout>
  );
};

export default PostsByTagPage;

export const query = graphql`
  query TagPageQuery($skip: Int!, $limit: Int!, $tag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { fields: { tags: { eq: $tag } } }
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
      edges: { node: { fields: { slug: string }; frontmatter: T } }[];
    };
  };
  pathContext: {
    currentPage: number;
    limit: number;
    numPages: number;
    skip: number;
    tag: string;
  };
}
