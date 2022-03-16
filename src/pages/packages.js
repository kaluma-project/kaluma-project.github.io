import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Footer from "../components/footer";
import "../styles/main.scss";

export default function Download({ data }) {
  const { html } = data.markdownRemark;
  const { navs } = data.site.siteMetadata;
  const packages = data.allPackagesJson.nodes;
  return (
    <Layout title="Kaluma">
      <header>
        <Nav title="Download" navs={navs} />
      </header>
      <main>
        <div className="container px-4 my-4">
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <div className="text-end">
            <p>
              <a
                className="btn btn-outline-secondary"
                href="https://github.com/kaluma-project/kaluma-project.github.io/issues/new?template=publish-package-template.md&title=[Publish Package]"
                target="_blank"
                rel="noreferrer"
              >
                Publish my package
              </a>
            </p>
          </div>
          <div className="text-start my-3">
            Total: <b>{packages.length} packages</b>
          </div>
          <div className="card">
            <ul className="list-group list-group-flush">
              {packages.map((item) => (
                <li className="list-group-item text-start">
                  <div className="d-flex justify-content-between">
                    <div>
                      <a href={item.repo} target="_blank" rel="noreferrer">
                        {item.name}
                      </a>
                    </div>
                    <div className="repo">
                      <code className="repo-install">npm i {item.repo}</code>
                      <button
                        className="repo-copy"
                        onclick="copyToClipboard('npm i {{item.repo}}')"
                        data-bs-placement="top"
                        data-bs-toggle="popover"
                        data-bs-content="Copied!"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-copy"
                        >
                          <rect
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            ry="2"
                          ></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="text-secondary">{item.description}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <div>
        <Footer navs={navs} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query PackagesPageQuery {
    markdownRemark(frontmatter: { slug: { eq: "__packages" } }) {
      frontmatter {
        layout
        slug
        title
      }
      html
    }
    site {
      siteMetadata {
        navs {
          name
          url
          blank
        }
        title
        siteUrl
        description
      }
    }
    allPackagesJson {
      nodes {
        repo
        description
        name
      }
    }
  }
`;
