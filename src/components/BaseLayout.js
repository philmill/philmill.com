import React, { PureComponent } from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';
import cliffPic from '../assets/black-white-cliff_1080.png';

class BaseLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.mobileLimitWidth = 468;
    this.state = { width: 0, height: 0 };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  render() {
    const { location, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;
    let footer;

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.1),
            marginBottom: rhythm(1.1),
            marginTop: 0,
          }}
        >
          Perspectives of Phil Mill
        </h1>
      );

      const footerBg = `url(${cliffPic}) no-repeat fixed 0% 140%`;

      footer = this.state.width >= this.mobileLimitWidth && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            height: rhythm(13),
            background: footerBg,
            filter: 'brightness(110%)',
          }}
        />
      );
    } else {
      header = (
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            back to the beginning ...
          </Link>
        </p>
      );
      footer = null;
    }

    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          ...this.props.style,
        }}
      >
        {header}
        {children}
        {footer}
      </div>
    );
  }
}

export default BaseLayout;
