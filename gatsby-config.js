const { IMAGE_MAX_WIDTH } = require('./gatsby/constants');

const developmentContent = {
  resolve: 'gatsby-source-filesystem',
  options: {
    name: 'devContent',
    path: `${__dirname}/devcontent`,
  },
};

module.exports = {
  siteMetadata: {
    title: 'charlesbadger.dev',
    description: "A web development blog where I talk about stuff I'm learning",
    siteUrl: 'https://www.charlesbadger.dev',
    author: 'Charles Badger',
  },
  plugins: [
    ...(process.env.NODE_ENV === 'production' ? [] : [developmentContent]),
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        default: require.resolve('./src/components/layout.tsx'),
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          `gatsby-remark-smartypants`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: IMAGE_MAX_WIDTH,
              linkImagesToOriginal: false,
              backgroundColor: 'transparent',
              wrapperStyle: fluidResult => `
                margin: 3rem auto;
              `,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStype: 'margin-bottom: 1.0725rem',
            },
          },
        ],
      },
    },
    'gatsby-remark-images',
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `charlesbadger.dev`,
        description:
          "A web development blog where I talk about stuff I'm learning",
        lang: 'en',
        short_name: `starter`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#FFF`,
        display: `minimal-ui`,
        icon: `images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                author
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => ({
                title: edge.node.frontmatter.title,
                date: edge.node.frontmatter.date,
                description: edge.node.excerpt,
                categories: edge.node.fields.categories,
                author: site.siteMetadata.author,
                url:
                  site.siteMetadata.siteUrl + '/blog' + edge.node.fields.slug,
                guid:
                  site.siteMetadata.siteUrl + '/blog' + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              }));
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      html
                      fields { 
                        slug
                        categories
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'RSS feed for charlesbadger.dev',
            match: '^/blog/',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
                context {
                  canonical
                }
              }
            }
          }
        `,
        resolveSiteUrl: ({ site }) => {
          return site.siteMetadata.siteUrl;
        },
        serialize: ({ site, allSitePage }) =>
          allSitePage.nodes
            .filter(node => node.context.canonical !== false)
            .map(node => {
              return {
                url: `${site.siteMetadata.siteUrl}${node.path}`,
                changefreq: `daily`,
                priority: 0.7,
              };
            }),
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-172669991-1',
        head: false,
        respectDNT: true,
      },
    },
  ],
};
