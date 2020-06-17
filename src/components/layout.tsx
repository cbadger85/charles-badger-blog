/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXProvider, MDXProviderComponentsProp } from '@mdx-js/react';

import Header from './header';
import './layout.css';
import CodeBlock from './code-block';

const preToCodeBlock = (preProps: PreToCodeBlockProps) => {
  if (preProps.children?.props?.mdxType === 'code') {
    return <CodeBlock {...preProps.children.props} />;
  }

  return <pre {...preProps} />;
};

interface PreToCodeBlockProps {
  children?: {
    props?: {
      mdxType: string;
      children: string;
      className: string;
    };
  };
}

const components: MDXProviderComponentsProp = {
  pre: preToCodeBlock,
  // wrapper: ({ children }) => <>{children}</>,
};

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  );
};

export default Layout;
