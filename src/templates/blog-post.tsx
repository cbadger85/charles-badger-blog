import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import PaginationLinks from '../components/pagination-links';
import SEO from '../components/seo';
import Typography from '../elements/typography';
import styles from './blog-post.module.scss';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

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
      <SEO
        title={`${title}`}
        description={data.mdx.excerpt}
        canonical={`https://wwww.charlesbadger.dev/blog/posts${data.mdx.fields.slug}`}
      />
      <article>
        <Typography component="h1" heading size="xl" color="secondary-light">
          {title}
        </Typography>
        <div>
          <Typography size="s" italic bottomSpacing="s">
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
      <div className={styles.submitErrorLink}>
        <Typography component="p">
          Find something wrong with this article? Make a pull request{' '}
          <OutboundLink
            href={`https://github.com/cbadger85/charles-badger-blog-content/blob/master/blog${data.mdx.fields.slug}index.mdx`}
          >
            <Typography link component="span">
              here
            </Typography>
          </OutboundLink>{' '}
          to submit your changes!
        </Typography>
      </div>
    </>
  );
};

export default BlogPostPage;

export const postQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 250)
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
`;

interface BlogPostPageProps extends PageProps {
  data: {
    mdx: {
      body: string;
      excerpt: string;
      fields: {
        slug: string;
      };
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
