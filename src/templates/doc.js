import React from 'react';
import { graphql } from 'gatsby';
import '../styles/main.scss';

export default function Doc({ data }) {
  const { html } = data.markdownRemark;
  const { title } = data.markdownRemark.frontmatter;
  return (
    <div>
      <h2>{title}</h2>
      <div>...</div>
      <div class="container markdown-content my-5 front-content">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

export const query = graphql`
  query MarkdownDocQuery($slug: String) {
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
