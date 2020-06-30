import React from 'react';
import SEO from '../components/seo';
import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Typography from '../elements/typography';

const AboutPage: React.FC<PageProps<PageData>> = ({ data }) => {
  return (
    <>
      <SEO title="About | charlesbadger.dev" description={data.mdx.excerpt} />
      <Typography component="h2" heading size="xl">
        About Me
      </Typography>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </>
  );
};

export default AboutPage;

export const query = graphql`
  query AboutPageQuery {
    mdx(frontmatter: { page: { eq: "about" } }) {
      id
      body
      excerpt
    }
  }
`;

interface PageData {
  mdx: {
    excerpt: string;
    body: string;
  };
}
