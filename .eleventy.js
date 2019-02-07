const moment = require('moment');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function(config) {
  config.addPlugin(pluginRss);
  config.addPlugin(pluginSyntaxHighlight);

  config.addFilter('formatDate', (dateObj) => {
    return moment(dateObj).format('YYYY-MM-DD');
  });

  config.addCollection('latestPosts', (collection) => {
    return collection
      .getFilteredByGlob('./src/posts/*')
      .sort((a, b) => a.date - b.date)
      .reverse()
      .filter((i) => i.inputPath.indexOf('index.html') <= 0)
      .splice(0, 5);
  });

  config.addCollection('posts', (collection) => {
    return collection
      .getFilteredByGlob('./src/posts/*')
      .sort((a, b) => a.date - b.date)
      .reverse()
      .filter((i) => i.inputPath.indexOf('index.html') <= 0);
  });

  config.addCollection('all', (collection) => {
    return collection.getAll();
  });

  config.addPassthroughCopy('./src/assets');
  config.addPassthroughCopy('./CNAME');

  return {
    templateFormats: [ 'md', 'njk', 'html' ],
    dir: {
      input: 'src',
      data: 'data',
      output: 'site',
      includes: 'layouts',
    }
  };
};
