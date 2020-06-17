const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const POSTS_PER_PAGE = 1;

const range = (size, startsAt = 0) =>
  [...Array(size).keys()].map(i => i + startsAt);

const groupPostsByCategory = posts =>
  posts.reduce((map, post) => {
    post.node.fields.tags.forEach(tag => {
      if (!map[tag]) {
        map[tag] = [];
      }
      map[tag].push(post);
    });
    return map;
  }, {});

const createPosts = (createPage, posts) => {
  const blogPostTemplate = path.resolve('src/templates/blog-post.tsx');

  const uri = '/blog/posts';

  posts.forEach(({ node }, i) => {
    createPage({
      path: uri + node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
        prevPostLink: i === 0 ? null : uri + posts[i - 1].node.fields.slug,
        prevPostTitle: i === 0 ? null : posts[i - 1].node.fields.title,
        nextPostLink:
          i === posts.length - 1 ? null : uri + posts[i + 1].node.fields.slug,
        nextPostTitle:
          i === posts.length - 1 ? null : posts[i + 1].node.fields.title,
      },
    });
  });
};

const createBlogList = (createPage, posts) => {
  const BlogListTemplate = path.resolve('src/templates/blog-list.tsx');
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const uri = '/blog';

  createPage({
    path: '/',
    component: BlogListTemplate,
    context: {
      limit: POSTS_PER_PAGE,
      skip: 0,
      numPages,
      currentPage: 1,
      nextPageLink: numPages <= 1 ? null : `${uri}/2`,
      prevPageLink: null,
    },
  });

  range(numPages).forEach(i => {
    createPage({
      path: `${uri}/${i + 1}`,
      component: BlogListTemplate,
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        numPages,
        currentPage: i + 1,
        nextPageLink: i === numPages - 1 ? null : `${uri}/${i + 2}`,
        prevPageLink: i === 0 ? null : `${uri}/${i}`,
      },
    });
  });
};

const createTagListPages = (createPage, posts) => {
  const BlogListTemplate = path.resolve('src/templates/tags-list.tsx');

  Object.entries(groupPostsByCategory(posts)).forEach(([tag, tagPosts]) => {
    const numPages = Math.ceil(tagPosts.length / POSTS_PER_PAGE);
    const uri = `/blog/tags/${tag}`;

    tagPosts.forEach((post, i) => {
      createPage({
        path: `/blog/tags/${tag}/${i + 1}`,
        component: BlogListTemplate,
        context: {
          limit: POSTS_PER_PAGE,
          skip: i * POSTS_PER_PAGE,
          numPages,
          currentPage: i + 1,
          tag,
          nextPageLink: i === numPages - 1 ? null : `${uri}/${i + 2}`,
          prevPageLink: i === 0 ? null : `${uri}/${i}`,
        },
      });
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
