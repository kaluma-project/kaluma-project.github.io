module.exports = {
  siteMetadata: {
    title: `Kaluma`,
    siteUrl: `https://kalumajs.org`,
    navs: [
      { name: "Download", url: "/download", blank: false },
      { name: "Showcase", url: "/showcase", blank: false },
      { name: "Packages", url: "/packages", blank: false },
      { name: "Docs", url: "/docs", blank: false },
      {
        name: "Discussions",
        url: "https://github.com/kaluma-project/kaluma/discussions",
        blank: true,
      },
      { name: "IDE", url: "/ide", blank: false },
    ],
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `packages`,
        path: `${__dirname}/src/packages/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `showcase`,
        path: `${__dirname}/src/showcase/`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              enableCustomId: true,
            },
          },
          "gatsby-remark-prismjs",
        ],
      },
    },
    "gatsby-transformer-json",
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
  ],
};
