import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import get from 'lodash/get';
import kebabCase from 'lodash/kebabCase';

import Bio from '../components/Bio';
import BaseLayout from '../components/BaseLayout';
import { rhythm, scale } from '../utils/typography';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { previousPost, nextPost } = this.props.data;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const siteUrl = get(this.props, 'data.site.siteMetadata.siteUrl');
    const siteDescription = post.excerpt;
    const tags = post.frontmatter.tags;
    const { relativePath } = this.props.pageContext;

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
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:creator',
        content: '@philmillme',
      },
      {
        name: 'twitter:title',
        content: post.frontmatter.title,
      },
      {
        name: 'twitter:description',
        content: post.excerpt,
      },
    ];

    if (post.frontmatter.featuredImage)
      metaData.push(
        {
          name: 'og:image',
          content: `${siteUrl}${post.frontmatter.featuredImage.childImageSharp.gatsbyImageData.src}`,
        },
        {
          name: 'twitter:image',
          content: `${siteUrl}${post.frontmatter.featuredImage.childImageSharp.gatsbyImageData.src}`,
        }
      );

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
            referrerPolicy="origin"
            target="_blank"
          >
            All Edits
          </a>
        </p>
        {post.frontmatter.featuredImage && (
          <GatsbyImage
            alt={post.frontmatter.featuredImage.name}
            image={
              post.frontmatter.featuredImage.childImageSharp.gatsbyImageData
            }
            style={{ zIndex: -1 }}
          />
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
        {tags && tags.length > 0 ? (
          <Fragment>
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
        <Bio />
        <hr
          style={{
            marginTop: rhythm(1),
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
            {previousPost && (
              <Link
                to={previousPost.frontmatter.path || previousPost.fields.slug}
                rel="prev"
              >
                ← {previousPost.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {nextPost && (
              <Link
                to={nextPost.frontmatter.path || previousPost.fields.slug}
                rel="nextPost"
              >
                {nextPost.frontmatter.title} →
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
  query BlogPostBySlug(
    $slug: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        siteUrl
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
            gatsbyImageData(width: 630, placeholder: NONE, layout: CONSTRAINED)
          }
          name
        }
        photoCredit
      }
    }
    previousPost: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    nextPost: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
