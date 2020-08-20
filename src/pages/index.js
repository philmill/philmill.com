import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import Bio from '../components/Bio';
import BaseLayout from '../components/BaseLayout';
import { rhythm } from '../utils/typography';

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    );
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <BaseLayout
        location={this.props.location}
        style={{ minHeight: rhythm(posts.length * 16) }}
      >
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        {posts.map(({ node }) => {
          const title =
            get(node, 'frontmatter.title') ||
            node.frontmatter.path ||
            node.fields.slug;
          return (
            <div key={node.frontmatter.path || node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link
                  style={{ boxShadow: 'none' }}
                  to={node.frontmatter.path || node.fields.slug}
                >
                  {title}
                </Link>
              </h3>
              {node.frontmatter.featuredImage && (
                <Img
                  sizes={node.frontmatter.featuredImage.childImageSharp.sizes}
                />
              )}
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          );
        })}
        <Bio />
      </BaseLayout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 10
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            path
            featuredImage {
              childImageSharp {
                sizes(maxWidth: 630) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
