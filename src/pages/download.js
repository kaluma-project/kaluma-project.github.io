import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Footer from "../components/footer";
import "../styles/main.scss";

export default function Download({ data }) {
  const { navs } = data.site.siteMetadata;
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
            <img src="/images/pico.png" width="250px" className="my-3" alt="" />
          </div>
          <div>
            <a href="/" className="tag-version" target="_blank">
              (checking...)
            </a>
          </div>
          <div className="my-4">
            <a href="/" className="btn btn-primary btn-rounded tag-download">
              Download .UF2
            </a>
          </div>
          <div>
            <a
              className="text-decoration-underline"
              href="/docs/getting-started/#install-firmware"
              target="_blank"
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
