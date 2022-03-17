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
      releaseLink: "#",
      downloadLink: "#",
      target: "rp2",
      board: "pico",
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
        releaseLink: `https://github.com/kaluma-project/kaluma/releases/tag/${release.tag_name}`,
        downloadLink: `https://github.com/kaluma-project/kaluma/releases/download/${release.tag_name}/kaluma-${this.state.target}-${this.state.board}-${release.tag_name}.uf2`,
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
          <div className="container px-4 my-4 text-center">
            <div>
              <div>
                Target: <b>RP2040 (Raspberry Pi Pico)</b>
              </div>
              <img
                src="/images/pico.png"
                width="250px"
                className="my-3"
                alt=""
              />
            </div>
            <div>
              <a
                href={this.state.releaseLink}
                className="tag-version"
                target="_blank"
                rel="noreferrer"
              >
                {this.state.version}
              </a>
            </div>
            <div className="my-4">
              <a
                href={this.state.downloadLink}
                className="btn btn-primary btn-rounded tag-download"
              >
                Download .UF2
              </a>
            </div>
            <div>
              <a
                className="text-decoration-underline"
                href="/docs/getting-started/#install-firmware"
                target="_blank"
                rel="noreferrer"
              >
                How to install .UF2 to my board?
              </a>
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
