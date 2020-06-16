import React from 'react';
import { graphql, Link } from 'gatsby';
import { BlogFrontmatter } from '../types/BlogFrontmatter';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const Template: React.FC<PageData<
  BlogFrontmatter,
  BlogPathContext<BlogFrontmatter>
>> = ({ data, pathContext }) => {
  const { title, date } = data.mdx.frontmatter;
  const body = data.mdx.body;
  const { next, prev } = pathContext;

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <em>{date}</em>
      </div>
      <MDXRenderer>{body}</MDXRenderer>
      <p>
        {prev && (
          <Link to={`/blog/posts${prev.fields.slug}`}>
            {prev.frontmatter.title}{' '}
            <span role="img" aria-label="point-left">
              👈{' '}
            </span>
            Previous
          </Link>
        )}
      </p>
      <p>
        {next && (
          <Link to={`/blog/posts${next.fields.slug}`}>
            {next.frontmatter.title}{' '}
            <span role="img" aria-label="point-left">
              👉{' '}
            </span>
            Next
          </Link>
        )}
      </p>
    </div>
  );
};

export const postQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`;

interface PageData<T, U> {
  data: {
    mdx: {
      excerpt: string;
      body: string;
      frontmatter: T;
    };
  };
  pathContext: U;
}

interface BlogPathContext<T> {
  prev?: { fields: { slug: string }; frontmatter: T };
  next?: { fields: { slug: string }; frontmatter: T };
}

export default Template;
