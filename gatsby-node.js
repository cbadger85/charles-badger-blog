const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const POSTS_PER_PAGE = 1;

const range = (size, startsAt = 0) =>
  [...Array(size).keys()].map(i => i + startsAt);

const createPosts = (createPage, posts) => {
  const blogPostTemplate = path.resolve('src/templates/blog-post.tsx');

  posts.forEach(({ node }, i) => {
    createPage({
      path: `blog/posts${node.fields.slug}`,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
        prev: i === 0 ? null : posts[i - 1].node,
        next: i === posts.length - 1 ? null : posts[i + 1].node,
      },
    });
  });
};

const createBlogList = (createPage, posts) => {
  const BlogListTemplate = path.resolve('src/templates/blog-list.tsx');
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  createPage({
    path: '/',
    component: BlogListTemplate,
    context: {
      limit: POSTS_PER_PAGE,
      skip: 0,
      numPages,
      currentPage: 1,
    },
  });

  range(numPages).forEach(i => {
    createPage({
      path: `/blog/${i + 1}`,
      component: BlogListTemplate,
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};

exports.createPages = ({ graphql, actions }) =>
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
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const { edges } = result.data.allMdx;
    const { createPage } = actions;

    createPosts(createPage, edges);
    createBlogList(createPage, edges);
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
  }
};
