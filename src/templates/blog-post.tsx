import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import SEO from '../components/seo';
import Typography from '../elements/typography';
import { BlogFrontmatter } from '../types/blog-frontmatter';
import PaginationLinks from '../components/pagination-links';

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
    <>
      <SEO title={title} />
      <div>
        <Typography component="h1" heading size="xl">
          {title}
        </Typography>
        <div>
          <em>{date}</em>
        </div>
        <MDXRenderer>{body}</MDXRenderer>
        <PaginationLinks
          nextPageLink={nextPostLink}
          nextPageText={nextPostTitle}
          prevPageLink={prevPostLink}
          prevPageText={prevPostTitle}
        />
      </div>
    </>
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
