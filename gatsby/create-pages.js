const path = require('path');
const slugify = require('slugify');
const { POSTS_PER_PAGE } = require('./constants');

const { range, groupPostsByCategory } = require('./utils');

exports.createPosts = (createPage, posts) => {
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

exports.createBlogList = (createPage, posts) => {
  const BlogListTemplate = path.resolve('src/templates/blog-list.tsx');
  const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const uri = '/blog';

  createPage({
    path: uri,
    component: BlogListTemplate,
    context: {
      limit: POSTS_PER_PAGE,
      skip: 0,
      numPages,
      currentPage: 1,
      nextPageLink: numPages <= 1 ? null : `${uri}/2`,
      prevPageLink: null,
      canonical: false,
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

exports.createCategoriesListPages = (createPage, posts) => {
  const BlogListTemplate = path.resolve('src/templates/categories-list.tsx');

  Object.entries(groupPostsByCategory(posts)).forEach(
    ([category, categoryPosts]) => {
      const numPages = Math.ceil(categoryPosts.length / POSTS_PER_PAGE);
      const categorySlug = slugify(category.toLowerCase());
      const uri = `/blog/categories/${categorySlug}`;

      categoryPosts.forEach((_, i) => {
        createPage({
          path: `${uri}/${i + 1}`,
          component: BlogListTemplate,
          context: {
            limit: POSTS_PER_PAGE,
            skip: i * POSTS_PER_PAGE,
            numPages,
            currentPage: i + 1,
            category: category,
            categorySlug: categorySlug,
            nextPageLink: i === numPages - 1 ? null : `${uri}/${i + 2}`,
            prevPageLink: i === 0 ? null : `${uri}/${i}`,
          },
        });
      });
    }
  );
};
