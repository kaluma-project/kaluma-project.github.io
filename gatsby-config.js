module.exports = {
  siteMetadata: {
    title: `Kaluma`,
    siteUrl: `https://kalumajs.org`,
    navs: [
      { name: 'Download', url: '/download', blank: false },
      { name: 'Packages', url: '/packages', blank: false },
      { name: 'Docs', url: '/docs', blank: false },
      {
        name: 'Discussions',
        url: 'https://discord.gg/5dvKfMnXhU',
        blank: true,
      },
      { name: 'IDE', url: '/ide', blank: false },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `markdown-pages`,
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
