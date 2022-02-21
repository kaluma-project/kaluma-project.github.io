const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginSass = require('eleventy-plugin-sass');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {});
  eleventyConfig.addPlugin(pluginSass, {
    watch: ['./src/styles/*.scss'],
    outputDir: './docs/styles',
  });
  eleventyConfig.addPassthroughCopy('./src/images');
  eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addPassthroughCopy('./src/favicon.ico');
  eleventyConfig.addPassthroughCopy('./CNAME');
  eleventyConfig.addWatchTarget('./src/js/*.js');

  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    slugify: (s) => {
      return encodeURIComponent(
        // String(s).trim().toLowerCase().replace(':', '-').replace(/\s+/g, '-')
        String(s)
          .trim()
          .toLowerCase()
          .replace(/\(.*\)/, '')
          .replace(/\s+/g, '-')
          .replace(/[^A-Za-z0-9\-]/g, '-')
          .replace('--', '-')
      );
    },
    permalink: true,
    permalinkClass: 'direct-link',
    permalinkSymbol: '#',
  });
  eleventyConfig.setLibrary('md', markdownLibrary);

  return {
    dir: {
      input: 'src',
      output: 'docs',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
