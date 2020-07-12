import React from 'react';
import SEO from '../components/seo';
import { graphql, PageProps } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Typography from '../elements/typography';
import CartoonMe from '../components/cartoon-me';
import styles from './about.module.scss';

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  return (
    <div className={styles.aboutPage}>
      <SEO title="About" description={data.mdx.excerpt} />
      <Typography component="h1" heading size="xl" color="secondary-light">
        {data.mdx.frontmatter.title}
      </Typography>
      <CartoonMe className={styles.aboutMe} />
      <div>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </div>
    </div>
  );
};

export default AboutPage;

export const query = graphql`
  query AboutPageQuery {
    mdx(frontmatter: { page: { eq: "about" } }) {
      frontmatter {
        title
      }
      id
      body
      excerpt
    }
  }
`;

interface AboutPageProps extends PageProps {
  data: {
    mdx: {
      excerpt: string;
      body: string;
      frontmatter: { title: string };
    };
  };
}
