import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import "../styles/main.scss";

export default function Doc({ data }) {
  const { html } = data.markdownRemark;
  const roots = data.allMarkdownRemark.nodes.filter(
    (n) => n.frontmatter.category === "root"
  );
  const boards = data.allMarkdownRemark.nodes.filter(
    (n) => n.frontmatter.category === "board"
  );
  const apis = data.allMarkdownRemark.nodes.filter(
    (n) => n.frontmatter.category === "api"
  );
  return (
    <Layout title="Docs | Kaluma">
      <nav className="doc-sidebar">
        <div className="doc-sidebar-header p-3 border-bottom">
          <a href="/">
            <img src="/images/kaluma-logo.png" width="32px" alt="" />
          </a>
          <span className="ms-2 fw-bold">Kaluma Docs</span>
        </div>
        <aside className="doc-sidebar-nav">
          <nav
            className="navbar-collapse collapse collapse-horizontal show"
            id="docs-nav"
          >
            <ul className="list-unstyled">
              {roots.map((node) => (
                <li>
                  <a href={"/" + node.frontmatter.slug}>
                    {node.frontmatter.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/kaluma-project/examples"
                  target="_blank"
                  rel="noreferrer"
                >
                  Examples
                </a>
              </li>
              <br />
              <div className="doc-section">Boards</div>
              {boards.map((node) => (
                <li>
                  <a href={"/" + node.frontmatter.slug}>
                    {node.frontmatter.title}
                  </a>
                </li>
              ))}
              <br />
              <div className="doc-section">API</div>
              {apis.map((node) => (
                <li>
                  <a href={"/" + node.frontmatter.slug}>
                    {node.frontmatter.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </nav>
      <div className="doc-body">
        <main
          className="container d-flex justify-content-center markdown-content"
          style={{ paddingBottom: "5rem" }}
        >
          <div
            style={{ width: "100%" }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </main>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query DocQuery($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        layout
        slug
        title
      }
      html
    }
    allMarkdownRemark {
      nodes {
        frontmatter {
          category
          order
          slug
          title
        }
      }
    }
  }
`;
