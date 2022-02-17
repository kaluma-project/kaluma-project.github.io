const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/images');
  eleventyConfig.addPassthroughCopy('./src/styles');
  eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addWatchTarget('./src/js/*.js');
  return {
    dir: {
      input: 'src',
      output: 'docs',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
