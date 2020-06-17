exports.range = (size, startsAt = 0) =>
  [...Array(size).keys()].map(i => i + startsAt);

exports.groupPostsByCategory = posts =>
  posts.reduce((map, post) => {
    post.node.fields.tags.forEach(tag => {
      if (!map[tag]) {
        map[tag] = [];
      }
      map[tag].push(post);
    });
    return map;
  }, {});
