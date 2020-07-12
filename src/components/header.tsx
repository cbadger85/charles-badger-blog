import { graphql, Link, useStaticQuery } from 'gatsby';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '../elements/typography';
import { getClasses } from '../utils/get-classes';
import styles from './header.module.scss';
import throttle from 'lodash/throttle';
import { useMediaQuery } from '../hooks/useMediaQuery';
import NavList from './nav-list';
import NavMenu from './nav-menu';
import ColorThemeToggle from './color-theme-toggle';

// const pluckTags = (posts: MdxEdges[]): string[] =>
//   Array.from(new Set(posts.flatMap(post => post.node.fields.tags)));

const MINIMUM_SCROLL = 15;

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
  const scrollY = typeof window === 'undefined' ? 0 : window.screenY;
  const headerRef = useRef<HTMLDivElement>(null);
  const [isFaded, setIsFaded] = useState(scrollY > MINIMUM_SCROLL);

  const isPhone = useMediaQuery(570);

  useEffect(() => {
    setIsFaded(window.scrollY > MINIMUM_SCROLL);
  }, []);

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
          <Typography component="span" heading size="m" color="primary">
            &lt;{siteTitle} /&gt;
          </Typography>
        </Link>
        <div className={styles.themeToggleAndNav}>
          {!isPhone && <ColorThemeToggle />}
          {isPhone ? <NavMenu /> : <NavList isBar />}
        </div>
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
