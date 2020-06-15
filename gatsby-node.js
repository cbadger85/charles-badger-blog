// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.tsx');

    resolve(
      graphql(`
        query {
          allMdx(sort: { order: ASC, fields: [frontmatter___date] }) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  tags
                }
              }
            }
          }
        }
      `).then(result => {
        const posts = result.data.allMdx.edges;

        posts.forEach(({ node }, i) => {
          createPage({
            path: `blog${node.fields.slug}`,
            component: blogPostTemplate,
            context: {
              slug: node.fields.slug,
              prev: i === 0 ? null : posts[i - 1].node,
              next: i === posts.length - 1 ? null : posts[i + 1].node,
            },
          });
          resolve();
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
