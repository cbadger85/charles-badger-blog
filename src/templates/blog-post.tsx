import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import PaginationLinks from '../components/pagination-links';
import SEO from '../components/seo';
import Typography from '../elements/typography';

const BlogPostPage: React.FC<BlogPostPageProps> = ({ data, pathContext }) => {
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
      <SEO title={`${title}`} description={data.mdx.excerpt} />
      <article>
        <Typography component="h1" heading size="xl" color="secondary-light">
          {title}
        </Typography>
        <div>
          <Typography size="s" italic subHeading>
            {date}
          </Typography>
        </div>
        <MDXRenderer>{body}</MDXRenderer>
        <PaginationLinks
          nextPageLink={nextPostLink}
          nextPageText={nextPostTitle}
          prevPageLink={prevPostLink}
          prevPageText={prevPostTitle}
        />
      </article>
    </>
  );
};

export default BlogPostPage;

export const postQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 250)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`;

interface BlogPostPageProps extends PageProps {
  data: {
    mdx: {
      body: string;
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
        tags: string[];
      };
    };
  };
  pathContext: {
    prevPostLink?: string;
    prevPostTitle?: string;
    nextPostLink?: string;
    nextPostTitle?: string;
  };
}
