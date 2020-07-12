import { graphql, PageProps } from 'gatsby';
import React from 'react';
import ArticleListItem from '../components/article-list-item';
import SEO from '../components/seo';
import Typography from '../elements/typography';

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const posts = data.allMdx.edges;

  return (
    <>
      <SEO title="Home | charlesbadger.dev" />
      <Typography component="h1" heading size="l" color="secondary-light">
        Most Recent Articles
      </Typography>
      {posts.map(({ node }) => (
        <ArticleListItem
          key={node.id}
          title={node.frontmatter.title}
          slug={node.fields.slug}
          date={node.frontmatter.date}
          categories={node.fields.categories}
          excerpt={node.excerpt}
        />
      ))}
    </>
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
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { page: { ne: "about" } } }
      limit: 10
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          fields {
            slug
            categories
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

interface IndexPageProps extends PageProps {
  data: {
    allMdx: {
      edges: {
        node: {
          id: string;
          excerpt: string;
          fields: { slug: string; categories: string[] };
          frontmatter: {
            title: string;
            date: string;
            tags: string[];
          };
        };
      }[];
    };
  };
}
