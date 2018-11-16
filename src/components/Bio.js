import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from '../assets/philmill-van.png'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`PhilMill`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: rhythm(2),
          }}
        />
        <p>
          Written by a pandimensional loop oddity existing in the Multiverse
          otherwise know as a Phil Mill phenomena who lives and works in
          Asheville creating.{' '}
          <a href="https://twitter.com/philmillme">
            Follow @philmillme on Twitter
          </a>
        </p>
      </div>
    )
  }
}

export default Bio