import { Link, useStaticQuery, graphql } from 'gatsby';
import React from 'react';

const pluckTags = (posts: MdxEdges[]): string[] =>
  Array.from(new Set(posts.flatMap(post => post.node.fields.tags)));

const Header: React.FC<HeaderProps> = ({ siteTitle = '' }) => {
  const data = useStaticQuery<TagQueryData>(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              tags
            }
          }
        }
      }
    }
  `);

  const tagList = pluckTags(data.allMdx.edges);

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </header>
  );
};

interface HeaderProps {
  siteTitle: String;
}

interface TagQueryData {
  allMdx: {
    edges: MdxEdges[];
  };
}

interface MdxEdges {
  node: {
    fields: {
      tags: string[];
    };
  };
}

export default Header;
