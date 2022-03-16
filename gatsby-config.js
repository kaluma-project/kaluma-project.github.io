module.exports = {
  siteMetadata: {
    title: `Kaluma`,
    siteUrl: `https://kalumajs.org`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `markdownPages`,
        path: `${__dirname}/src/markdown-pages/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-prismjs'],
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
  ],
};
