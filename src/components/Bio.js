import React, { Fragment } from 'react';

import profilePic from '../assets/philmill-van.png';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    return (
      <Fragment>
        <hr
          style={{
            marginTop: rhythm(1),
            marginBottom: rhythm(1),
          }}
        />
        <div
          style={{
            display: 'flex',
          }}
        >
          <img
            src={profilePic}
            alt={`Phil Mill`}
            style={{
              flex: '1 0 auto',
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              width: '56px',
              height: '56px',
              borderRadius: '56px',
            }}
          />
          <p style={{ marginBottom: 0 }}>
            Written by a pandimensional loop oddity existing in the Multiverse
            otherwise know as a Phil Mill phenomena who lives and works in
            United States creating.{' '}
            <a href="https://twitter.com/philmillme">
              Follow @philmillme on Twitter
            </a>
          </p>
        </div>
      </Fragment>
    );
  }
}

export default Bio;
