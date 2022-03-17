import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Footer from "../components/footer";
import "../styles/page.scss";

export default class Packages extends React.Component {
  componentDidMount() {
    /*
    var popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new window.bootstrap.Popover(popoverTriggerEl);
    });

    function closeAllPopover() {
      popoverList.map((popover) => {
        popover.hide();
      });
    }

    function copyToClipboard(val) {
      const t = document.createElement("textarea");
      document.body.appendChild(t);
      t.value = val;
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
      setTimeout(() => {
        closeAllPopover();
      }, 1000);
    }
    // window.copyToClipboard = copyToClipboard;
    */
  }

  render() {
    const { html } = this.props.data.markdownRemark;
    const { navs } = this.props.data.site.siteMetadata;
    const packages = this.props.data.allPackagesJson.nodes;
    return (
      <Layout title="Kaluma">
        <header>
          <Nav title="Packages" navs={navs} />
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
                  <li className="list-group-item text-start" key={item.name}>
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
                          onClick="copyToClipboard('npm i {{item.repo}}')"
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
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
