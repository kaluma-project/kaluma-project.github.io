const path = require("path");

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        util: require.resolve("util/"),
        assert: require.resolve("assert/"),
      },
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query MyQuery {
      allMarkdownRemark {
        nodes {
          html
          frontmatter {
            layout
            title
            slug
          }
        }
      }
    }
  `);

  data.allMarkdownRemark.nodes.forEach((node) => {
    actions.createPage({
      path: `/${node.frontmatter.slug}`,
      component: path.resolve(`./src/templates/${node.frontmatter.layout}`),
      context: { slug: node.frontmatter.slug },
    });
  });
};
