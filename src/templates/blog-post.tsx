import React from 'react';
import { graphql, Link } from 'gatsby';
import { BlogFrontmatter } from '../types/BlogFrontmatter';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const Template: React.FC<PageData<BlogFrontmatter, BlogPathContext>> = ({
  data,
  pathContext,
}) => {
  const { title, date } = data.mdx.frontmatter;
  const body = data.mdx.body;
  const {
    nextPostLink,
    nextPostTitle,
    prevPostLink,
    prevPostTitle,
  } = pathContext;

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <em>{date}</em>
      </div>
      <MDXRenderer>{body}</MDXRenderer>
      <p>
        {prevPostLink && prevPostTitle && (
          <Link to={prevPostLink}>
            {prevPostTitle}{' '}
            <span role="img" aria-label="point-left">
              👈{' '}
            </span>
            Previous
          </Link>
        )}
      </p>
      <p>
        {nextPostLink && nextPostTitle && (
          <Link to={nextPostLink}>
            {nextPostTitle}{' '}
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

interface BlogPathContext {
  prevPostLink?: string;
  prevPostTitle?: string;
  nextPostLink?: string;
  nextPostTitle?: string;
}

export default Template;
