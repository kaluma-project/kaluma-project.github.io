const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./tailwind.config.js');
  eleventyConfig.addWatchTarget('./src/styles/main.pcss');
  eleventyConfig.addPassthroughCopy('./src/images');
  eleventyConfig.addPlugin(syntaxHighlight);
  return {
    dir: {
      input: 'src',
      output: 'docs',
    },
    markdownTemplateEngine: 'njk',
  };
};
