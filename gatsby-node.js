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
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges
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

          createPage({
            path: post.node.frontmatter.path || post.node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug: post.node.fields.slug,
              previousPage,
              nextPage,
            },
          })
        })
      })
    )
  })
}

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
