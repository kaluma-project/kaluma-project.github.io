import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Footer from "../components/footer";
import "../styles/page.scss";

export default class Download extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: "checking",
    };
  }

  async componentDidMount() {
    const res = await fetch(
      "https://api.github.com/repos/kaluma-project/kaluma/releases/latest",
      {
        method: "GET",
        headers: {
          "User-Agent": "Kaluma",
        },
      }
    );
    const release = await res.json();
    this.setState((prev) => {
      return {
        ...prev,
        version: release.name,
      };
    });
  }

  render() {
    const { navs } = this.props.data.site.siteMetadata;
    return (
      <Layout title="Kaluma">
        <header>
          <Nav title="Download" navs={navs} />
        </header>
        <main>
          <div className="container px-4 my-4">
            <h3>Download</h3>
            <p>
              <a
                className="text-decoration-underline"
                href="/docs/getting-started/#install-firmware"
                target="_blank"
                rel="noreferrer"
              >
                How to install .UF2 to my board?
              </a>
            </p>
          </div>
          <div className="container px-4 download">
            <div className="fs-1 fw-bold my-2">RP2040</div>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
              <div className="col">
                <div className="card">
                  <img
                    src="/images/pico.png"
                    width="250px"
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <div className="card-title">Raspberry Pi Pico</div>
                    <p className="card-text text-secondary">
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.0.0"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.0.0
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.1"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.1.0-beta.1
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.2"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.1.0-beta.2
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.3"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.1.0-beta.3
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.4"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.1.0-beta.4
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.1.0"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.1.0
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.0-beta.1"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.0-beta.1
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.0-beta.2"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.0-beta.2
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.0"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.0
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.1"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.1
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/download/1.2.1/kaluma-rp2-pico-1.2.1.uf2"
                        className="btn btn-primary btn-rounded tag-download mt-2"
                      >
                        Download the latest .UF2
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img
                    src="/images/pico-w.png"
                    width="250px"
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <div className="card-title">Raspberry Pi Pico W</div>
                    <p className="card-text text-secondary">
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.1"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.1.0-beta.1
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.2"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.1.0-beta.2
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.3"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.1.0-beta.3
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.1.0-beta.4"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.1.0-beta.4
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.1.0"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.1.0
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.0-beta.1"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.0-beta.1
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.0-beta.2"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.0-beta.2
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.0"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.0
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.1"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.1
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/download/1.2.1/kaluma-rp2-pico-w-1.2.1.uf2"
                        className="btn btn-primary btn-rounded tag-download mt-2"
                      >
                        Download the latest .UF2
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container px-4 download">
            <div className="fs-1 fw-bold my-2">RP2350</div>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
              <div className="col">
                <div className="card">
                  <img
                    src="/images/pico2.png"
                    width="250px"
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <div className="card-title">Raspberry Pi Pico2</div>
                    <p className="card-text text-secondary">
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.0-beta.1"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.0-beta.1
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.0-beta.2"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.0-beta.2
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.0"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.0
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.1"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.1
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/download/1.2.1/kaluma-rp2-pico2-1.2.1.uf2"
                        className="btn btn-primary btn-rounded tag-download mt-2"
                      >
                        Download the latest .UF2
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <img
                    src="/images/pico2-w.png"
                    width="250px"
                    className="card-img-top"
                    alt=""
                  />
                  <div className="card-body">
                    <div className="card-title">Raspberry Pi Pico2 W</div>
                    <p className="card-text text-secondary">
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.0-beta.2"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.0-beta.2
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.0"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.0
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/tag/1.2.1"
                        className="tag-version"
                        target="_blank"
                        rel="noreferrer"
                      >
                        1.2.1
                      </a>
                      <br />
                      <a
                        href="https://github.com/kaluma-project/kaluma/releases/download/1.2.1/kaluma-rp2-pico2-w-1.2.1.uf2"
                        className="btn btn-primary btn-rounded tag-download mt-2"
                      >
                        Download the latest .UF2
                      </a>
                    </p>
                  </div>
                </div>
              </div>
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
  query DownloadPageQuery {
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
  }
`;
