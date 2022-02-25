const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginSass = require('eleventy-plugin-sass');
const pluginWebpack = require('@jamshop/eleventy-plugin-webpack');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

module.exports = function (eleventyConfig) {
  // plugins
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {});
  eleventyConfig.addPlugin(pluginSass, {
    watch: ['./src/styles/*.scss'],
    outputDir: './docs/styles',
  });
  eleventyConfig.addPlugin(pluginWebpack, {
    entryPoints: {
      packages: './src/js/packages.js',
      ide: './src/js/ide.jsx',
    },
    output: './docs/js',
    configFunction: (config) => {
      return Object.assign(config, {
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: 'babel-loader',
            },
          ],
        },
      });
    },
    // configFunction, // A function that recieves a webpack config to modify and return
  });

  // passthrough files
  eleventyConfig.addPassthroughCopy('./src/images');
  // eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addPassthroughCopy('./src/favicon.ico');
  eleventyConfig.addPassthroughCopy('./CNAME');

  // watch files
  eleventyConfig.addWatchTarget('./src/js/*.js');

  // filters
  eleventyConfig.addFilter('sortByOrder', (values) => {
    return values.slice().sort((a, b) => a.data.order - b.data.order);
  });

  // enhance markdown to generate 'id' attr for heading tags (h1, h2, ...)
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    slugify: (s) => {
      return encodeURIComponent(
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
