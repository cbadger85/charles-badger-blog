import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '../elements/typography';
import { getClasses } from '../utils/getClasses';
import styles from './header.module.scss';
import throttle from 'lodash/throttle';

// const pluckTags = (posts: MdxEdges[]): string[] =>
//   Array.from(new Set(posts.flatMap(post => post.node.fields.tags)));

const MINIMUM_SCROLL = 50;

const Header: React.FC<HeaderProps> = ({ siteTitle = '' }) => {
  // const data = useStaticQuery<TagQueryData>(graphql`
  //   query {
  //     allMdx {
  //       edges {
  //         node {
  //           fields {
  //             tags
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);

  // const tagList = pluckTags(data.allMdx.edges);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isFaded, setIsFaded] = useState(window.scrollY > MINIMUM_SCROLL);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsFaded(window.scrollY > MINIMUM_SCROLL);
    }, 250);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <header
      ref={headerRef}
      className={getClasses(
        styles.headerWrapper,
        isFaded && styles.headerWrapperScroll
      )}
    >
      <div
        className={getClasses(styles.header, isFaded && styles.headerScroll)}
      >
        <Typography component="h1" heading size="m">
          <Link to="/" className={styles.headerTitle}>
            {siteTitle}
          </Link>
        </Typography>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/blog">Blog</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
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
