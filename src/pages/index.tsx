import { graphql, PageProps } from 'gatsby';
import React from 'react';
import ArticleListItem from '../components/article-list-item';
import CategoryLinks from '../components/category-links';
import Pill from '../components/pill';
import SEO from '../components/seo';
import Typography from '../components/typography';
import styles from './index.module.scss';

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const posts = data.allMdx.edges;

  const aboutTitle = data.mdx.frontmatter.title;
  const aboutText = data.mdx.mdxAST.children
    .find(child => child.type === 'paragraph')
    ?.children.find(child => child.type === 'text')?.value;

  const allCategories = Array.from(
    new Set(posts.flatMap(post => post.node.fields.categories))
  );

  return (
    <>
      <SEO title="Home" canonical="https://wwww.charlesbadger.dev" />
      <div className={styles.content}>
        <main>
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
        </main>
        <div className={styles.asideContent}>
          <aside className={styles.aside}>
            <Typography component="h2" heading size="m" color="tertiary">
              {aboutTitle}
            </Typography>
            <Typography component="p">{aboutText}</Typography>
          </aside>
          <aside className={styles.aside}>
            <Typography component="h2" heading size="m" color="tertiary">
              Categories
            </Typography>
            <CategoryLinks categories={allCategories} />
          </aside>
        </div>
      </div>
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
    mdx(frontmatter: { page: { eq: "about" } }) {
      frontmatter {
        title
      }
      mdxAST
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
    mdx: {
      excerpt: string;
      body: string;
      mdxAST: MdxAst;
      frontmatter: { title: string };
    };
  };
}

interface MdxAst {
  type: 'root';
  children: {
    type: string;
    children: {
      type: string;
      value: string;
    }[];
  }[];
}
