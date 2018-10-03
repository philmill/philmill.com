import Link from 'gatsby-link'
import Media from 'react-media'
import React from 'react'

const Header = () => (
  <div
    style={{
      background: '#f5f5f5',
      marginBottom: '3rem',
      borderBottom: '2px solid #e6e6e6',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 980,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <Media query={{ maxWidth: 848 }}>
        {matches =>
          matches ? (
            <h1 style={{ margin: 0, textAlign: 'center'}}>
              <Link
                to="/"
              >
                a pan-dimensional loop oddity existing across the multiverse
              </Link>
            </h1>
          ) : (
            <h1 style={{ margin: 0, textAlign: 'center' }}>
              <Link
                to="/"
              >
                a pan-dimensional loop oddity existing across the multiverse
              </Link>
            </h1>
          )
        }
      </Media>
    </div>
  </div>
);

export default Header
