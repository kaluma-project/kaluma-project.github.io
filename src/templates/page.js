import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import '../styles/main.scss';

export default function Page({ data }) {
  const { html } = data.markdownRemark;
  const { title } = data.markdownRemark.frontmatter;
  return (
    <Layout title={title} navs={data.site.siteMetadata.navs}>
      <div>
        <div className="container text-center my-4">
          <h1 style={{ fontWeight: 900 }}>Kaluma</h1>
          <p className="mb-3" style={{ color: '#666', fontSize: '20px' }}>
            A tiny JavaScript runtime for RP2040 (Raspberry Pi Pico)
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
        <div class="container markdown-content my-5 front-content">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query PageQuery($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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
