const { createFilePath } = require('gatsby-source-filesystem');
const {
  createBlogList,
  createPosts,
  createCategoriesListPages,
} = require('./gatsby/create-pages');

exports.createPages = ({ graphql, actions }) =>
  graphql(`
    query {
      allMdx(
        sort: { order: ASC, fields: [frontmatter___date] }
        filter: { frontmatter: { page: { ne: "about" } } }
      ) {
        edges {
          node {
            fields {
              title
              slug
              categories
            }
            frontmatter {
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
    createCategoriesListPages(createPage, edges);
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
      name: 'title',
      node,
      value: node.frontmatter.title,
    });

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || [],
    });
  }
};
