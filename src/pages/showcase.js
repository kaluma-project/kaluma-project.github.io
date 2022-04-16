import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Footer from "../components/footer";
import "../styles/page.scss";

export default class Showcase extends React.Component {
  render() {
    const { navs } = this.props.data.site.siteMetadata;
    const showcaseItems = this.props.data.allShowcaseJson.nodes;
    return (
      <Layout title="Kaluma">
        <header>
          <Nav title="Showcase" navs={navs} />
        </header>
        <main>
          <div className="container px-4 my-4">
            <h3>Showcase</h3>
            <p>Projects made with Kaluma.</p>
            <div className="text-end">
              <a
                className="btn btn-outline-secondary"
                href="https://github.com/kaluma-project/kaluma-project.github.io/issues/new?template=publish-project-template.md&title=[Publish Request] New Project in Showcase"
                target="_blank"
                rel="noreferrer"
              >
                Publish my project
              </a>
            </div>
          </div>
          <div className="container px-4 showcase">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
              {showcaseItems.map((item) => (
                <div className="col" key={item.name}>
                  <div className="card">
                    <a href={item.repo} target="_blank" rel="noreferrer">
                      <img
                        src={item.thumbnail}
                        className="card-img-top"
                        alt="..."
                      />
                    </a>
                    <div className="card-body">
                      <div className="card-title">
                        <a href={item.repo} target="_blank" rel="noreferrer">
                          {item.name}
                        </a>
                      </div>
                      <p className="card-text text-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
  query ShowcasePageQuery {
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
    allShowcaseJson {
      nodes {
        repo
        description
        name
        thumbnail
      }
    }
  }
`;
