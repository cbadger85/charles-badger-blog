exports.range = (size, startsAt = 0) =>
  [...Array(size).keys()].map(i => i + startsAt);

exports.groupPostsByCategory = posts =>
  posts.reduce((map, post) => {
    post.node.fields.categories.forEach(category => {
      if (!map[category]) {
        map[category] = [];
      }
      map[category].push(post);
    });
    return map;
  }, {});
