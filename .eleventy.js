const moment = require('moment');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function(config) {
  config.addPlugin(pluginRss);
  config.addPlugin(pluginSyntaxHighlight);

  config.addFilter('formatDate', (dateObj) => {
    return moment(dateObj).format('MM-DD-YYYY');
  });

  config.addFilter('formatDateSitemap', (dateObj) => {
    return moment(dateObj).format('YYYY-MM-DD');
  });

  config.addFilter('squash', (text) => {
    // "text" : "{{ (item.data.title + " " + item.templateContent) | squash }}"
    /*
    var content = new String(text);
    var content = content.toLowerCase();
    var re = /(&lt;.*?&gt;)/gi;
    var plain = unescape(content.replace(re, ''));
    var words = plain.split(' ');
    var deduped = [...(new Set(words))];
    var dedupedStr = deduped.join(' ')
    var result = dedupedStr.replace(/\b(\.|\,|the|a|an|and|am|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi, '');
    result = result.replace(/\.|\,|\?|-|—|\n/g, '');
    result = result.replace(/[ ]{2,}/g, ' ');
    */
    var content = new String(text);
    var escapedContent = content
      .toLowerCase()
      .replace(/(&lt;.*?&gt;)/gi, '')
      .replace(/\\n/g, "")
      .replace(/\\'/g, "")
      .replace(/\\"/g, '')
      .replace(/\\&/g, "")
      .replace(/\\r/g, "")
      .replace(/\\t/g, "")
      .replace(/\\b/g, "")
      .replace(/\\f/g, "");
    var result = escapedContent
      .replace(/\b(\.|\,|the|a|an|and|am|you|I|to|if|of|off|me|my|on|in|it|is|at|as|we|do|be|has|but|was|so|no|not|or|up|for)\b/gi, '');
    return JSON.stringify(result);
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
