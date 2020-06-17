const { createFilePath } = require('gatsby-source-filesystem');
const {
  createBlogList,
  createPosts,
  createTagListPages,
} = require('./gatsby/create-pages');

exports.createPages = ({ graphql, actions }) =>
  graphql(`
    query {
      allMdx(sort: { order: ASC, fields: [frontmatter___date] }) {
        edges {
          node {
            fields {
              title
              slug
              tags
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
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const { edges } = result.data.allMdx;
    const { createPage } = actions;

    createPosts(createPage, edges);
    createBlogList(createPage, edges);
    createTagListPages(createPage, edges);
  });

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });

    createNodeField({
      name: 'tags',
      node,
      value: node.frontmatter.tags,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    });
  }
};
