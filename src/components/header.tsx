import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '../elements/typography';
import { getClasses } from '../utils/getClasses';
import styles from './header.module.scss';
import throttle from 'lodash/throttle';
import { useMediaQuery } from '../hooks/useMediaQuery';
import NavList from './nav-list';
import NavMenu from './nav-menu';

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

  const isPhone = useMediaQuery(570);

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
        <Link to="/" className={styles.headerTitle}>
          <Typography component="h1" heading size="m">
            {siteTitle}
          </Typography>
        </Link>
        {isPhone ? <NavMenu /> : <NavList isBar />}
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
