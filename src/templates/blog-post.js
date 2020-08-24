import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';

import Bio from '../components/Bio';
import BaseLayout from '../components/BaseLayout';
import { rhythm, scale } from '../utils/typography';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const siteDescription = post.excerpt;
    const tags = post.frontmatter.tags;
    const {
      previousPage,
      nextPage,
      lastEdited,
      relativePath,
    } = this.props.pageContext;

    const metaData = [
      {
        name: 'description',
        content: siteDescription,
      },
      {
        name: 'og:title',
        content: post.frontmatter.title,
      },
      {
        name: 'og:description',
        content: post.excerpt,
      },
    ];

    if (post.frontmatter.featuredImage)
      metaData.push({
        name: 'og:image',
        content: post.frontmatter.featuredImage.childImageSharp.fluid.src,
      });

    return (
      <BaseLayout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title={`${post.frontmatter.title} | ${siteTitle}`}
          meta={metaData}
        />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          Published {post.frontmatter.date}
        </p>
        <p
          style={{
            ...scale(-1 / 4),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1.3),
          }}
        >
          <a
            href={`https://github.com/philmill/philmill.com/commits/master/src/pages/${relativePath}`}
            referrerpolicy="origin"
            target="_blank"
          >
            Edited {lastEdited}
          </a>
        </p>
        {post.frontmatter.featuredImage && (
          <Img fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
        )}
        {post.frontmatter.photoCredit && (
          <p
            style={{
              ...scale(-1 / 5),
              marginBottom: rhythm(1),
              lineHeight: rhythm(0.7),
              color: 'hsla(0,0%,0%,0.59)',
              fontStyle: 'italic',
            }}
          >
            <span
              dangerouslySetInnerHTML={{ __html: post.frontmatter.photoCredit }}
            />
          </p>
        )}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
        {tags && tags.length > 0 ? (
          <Fragment>
            <h4>Tagged with:</h4>
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                padding: 0,
              }}
            >
              {tags.map((tag, index) => (
                <li key={index} style={{ marginRight: rhythm(0.5) }}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </Fragment>
        ) : null}
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previousPage && (
              <Link
                to={previousPage.frontmatter.path || previousPage.fields.slug}
                rel="prev"
              >
                ← {previousPage.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {nextPage && (
              <Link
                to={nextPage.frontmatter.path || previousPage.fields.slug}
                rel="nextPage"
              >
                {nextPage.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </BaseLayout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        path
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 630) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        photoCredit
      }
    }
  }
`;
