import React from 'react';
import { graphql } from 'gatsby';
import '../styles/main.scss';

export default function Front({ data }) {
  const { html } = data.markdownRemark;
  const { title } = data.markdownRemark.frontmatter;
  return (
    <div>
      <h2>{title}</h2>
      <div>...</div>
      <div className="container text-center my-4">
        <h1 style={{ fontWeight: 900 }}>Kaluma</h1>
        <p className="mb-3" style={{ color: '#666', fontSize: '20px' }}>
          A tiny JavaScript runtime for RP2040 (Raspberry Pi Pico)
        </p>
      </div>
      <div className="text-center my-5">
        <a className="btn btn-primary btn-rounded" href="/docs/getting-started">
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
  );
}

export const query = graphql`
  query MarkdownQuery($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        layout
        slug
        title
      }
      html
    }
  }
`;
