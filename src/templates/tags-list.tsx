import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import GatsbyImage from '../components/gatsby-image';
import SEO from '../components/seo';
import { BlogFrontmatter } from '../types/blog-frontmatter';

const PostsByTagPage: React.FC<PostsByTagPageProps<BlogFrontmatter>> = ({
  data,
  pathContext,
}) => {
  const posts = data.allMdx.edges;
  const { nextPageLink, prevPageLink } = pathContext;

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <GatsbyImage />
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
          {prevPageLink && (
            <p>
              <Link to={prevPageLink}>
                <span role="img" aria-label="point-left">
                  👈 Previous Page
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
    numPages: number;
    skip: number;
    tag: string;
    tagSlug: string;
    nextPageLink?: string;
    prevPageLink?: string;
  };
}
