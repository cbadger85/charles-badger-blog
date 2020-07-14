import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO: React.FC<SEOProps> = ({
  description = '',
  lang = 'en',
  meta = [],
  title,
  canonical,
}) => {
  const { site, imageSharp } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            description
            author
          }
        }
        imageSharp: file(relativePath: { eq: "og-image.png" }) {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const image = `${site.siteMetadata.siteUrl}${imageSharp.childImageSharp.original.src}`;

  const canonicalLink = canonical
    ? [
        {
          rel: 'canonical',
          href: typeof canonical === 'string' ? canonical : undefined,
        },
      ]
    : [];

  return (
    <Helmet
      defer={false}
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: 'image',
          content: image,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: 'og:image',
          content: image,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: image,
        },
        ...meta,
      ]}
      link={[
        {
          href:
            'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,400&display=fallback',
          rel: 'stylesheet',
        },
        {
          href:
            'https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=fallback',
          rel: 'stylesheet',
        },
        ...canonicalLink,
      ]}
    />
  );
};

interface SEOProps {
  lang?: string;
  description?: string;
  title: string;
  meta?: { name: string; content: string }[];
  canonical?: boolean | string;
}

export default SEO;
