import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
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

    return (
      <BaseLayout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
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
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        {tags && tags.length > 0 ? (
          <Fragment>
            <h3>Tagged with:</h3>
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                listStyle: 'none',
                padding: 0,
              }}
            >
              {tags.map((tag, index) => (
                <li key={index}>
                  <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </Fragment>
        ) : null}
        <Bio />
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
      }
    }
  }
`;
