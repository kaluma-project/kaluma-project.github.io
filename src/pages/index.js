import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Footer from "../components/footer";
import "../styles/page.scss";

export default function Home({ data }) {
  const { navs } = data.site.siteMetadata;
  const { html } = data.markdownRemark;
  return (
    <Layout title="Kaluma">
      <div className="hero">
        <header>
          <Nav title="" navs={navs} />
        </header>
        <div className="container text-center my-4">
          <h1 style={{ fontWeight: 900 }}>Kaluma</h1>
          <p className="mb-3" style={{ color: "#666", fontSize: "20px" }}>
            A tiny JavaScript runtime for RP2040 and RP2350 (Raspberry Pi Pico)
          </p>
        </div>
        <div className="text-center my-5">
          <a
            className="btn btn-primary btn-rounded"
            href="/docs/getting-started"
          >
            Get Started
          </a>
          <span className="mx-1"></span>
          <a className="btn btn-outline-secondary btn-rounded" href="/download">
            Download
          </a>
        </div>
      </div>
      <div className="container markdown-content my-5 front-content">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div>
        <Footer navs={navs} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query IndexPageQuery {
    markdownRemark(frontmatter: { slug: { eq: "__home" } }) {
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
  }
`;
