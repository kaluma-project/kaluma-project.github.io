import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Footer from "../components/footer";
import "../styles/page.scss";

export default class Packages extends React.Component {
  constructor(props) {
    super(props);
    this.copyToClipboard = (repo) => {
      console.log("copy!", repo);
      const t = document.createElement("textarea");
      document.body.appendChild(t);
      t.value = `npm i ${repo}`;
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
      const btn = document.getElementById(`copy-btn-${repo}`);
      btn.innerText = "COPIED!";
      setTimeout(() => {
        btn.innerText = "COPY";
      }, 1000);
    };
  }
  componentDidMount() {}

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
                          onClick={() => {
                            this.copyToClipboard(item.repo);
                          }}
                        >
                          <span id={"copy-btn-" + item.repo}>COPY</span>
                        </button>
                      </div>
                    </div>
                    <div className="text-secondary mt-1">
                      {item.description}
                    </div>
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
