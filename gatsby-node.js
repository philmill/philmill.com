const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const _ = require('lodash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('./src/templates/blog-post.js')
    const blogTagTemplate = path.resolve('src/templates/blog-tags.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    tags
                    path
                  }
                }
              }
            }
            allFile(filter: { ext: { eq: ".md" } }) {
              edges {
                node {
                  relativePath
                  modifiedTime(formatString: "MMMM DD, YYYY")
                  childMarkdownRemark {
                    id
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges
        // markdown files
        const files = result.data.allFile.edges
        // Tag pages:
        let tags = []

        posts.forEach((post, index) => {
          const previousPage =
            index === posts.length - 1 ? null : posts[index + 1].node
          const nextPage = index === 0 ? null : posts[index - 1].node

          if (post.node.frontmatter.tags) {
            tags = tags.concat(post.node.frontmatter.tags)
          }

          // Eliminate duplicate tags
          tags = _.uniq(tags)

          // Make tag pages
          tags.forEach(tag => {
            createPage({
              path: `/tags/${_.kebabCase(tag)}/`,
              component: blogTagTemplate,
              context: {
                tag,
              },
            })
          })

          const { node: md } = files.find(
            file => file.node.childMarkdownRemark.id === post.node.id
          )

          createPage({
            path: post.node.frontmatter.path || post.node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug: post.node.fields.slug,
              previousPage,
              nextPage,
              lastEdited: md.modifiedTime,
              relativePath: md.relativePath,
            },
          })
        })
      })
    )
  })
}
//https://github.com/philmill/philmill.com/commits/master/src/pages/posts/2018/06/notes-on-intercepted-episode-58/index.md

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
