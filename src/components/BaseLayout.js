import React, { Fragment, PureComponent } from 'react';
import { Link } from 'gatsby';
import throttle from 'lodash/throttle';

import { rhythm, scale } from '../utils/typography';
import cliffPic from '../assets/black-white-cliff_1080.png';
import profilePic from '../assets/philmill-van.png';

class BaseLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.mobileLimitHeight = 736;
    this.state = {
      width: 0,
      height: 0,
      scrollY: 0,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    if (this.rootPath) {
      window.addEventListener('resize', this.updateWindowDimensions);
      window.addEventListener('scroll', this.throttledUpdateScrollY);
    }
  }

  componentWillUnmount() {
    if (this.rootPath) {
      window.removeEventListener('resize', this.updateWindowDimensions);
      window.removeEventListener('scroll', this.throttledUpdateScrollY);
    }
  }

  get rootPath() {
    return this.props.location.pathname === `${__PATH_PREFIX__}/`;
  }

  get showFooter() {
    return this.rootPath && this.state.height > this.mobileLimitHeight;
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  updateScrollY = () => {
    this.setState({ scrollY: Math.round(window.scrollY) });
  };

  throttledUpdateScrollY = throttle(this.updateScrollY, 300);

  render() {
    let header;
    let footer;
    let sideNav;

    if (this.rootPath) {
      header = <h1>Perspectives of Phil Mill</h1>;

      const footerBg = `url(${cliffPic}) no-repeat fixed`;
      const backgroundPosition =
        this.state.scrollY < 100 ? '10% 155%' : '0% 200%';

      footer = this.showFooter && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            height: rhythm(5.5),
            background: footerBg,
            backgroundPosition,
            filter: 'brightness(110%)',
            transition: 'background-position 300ms ease',
          }}
        />
      );
    } else {
      sideNav = (
        <div
          style={{
            position: 'sticky',
            top: 0,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: `${rhythm(0.3)} ${rhythm(0.6)}`,
            backgroundColor: 'white',
            marginBottom: rhythm(-1.6),
          }}
        >
          <Link
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            to={'/'}
          >
            <img
              src={profilePic}
              alt="Phil Mill"
              style={{
                flex: '1 0 auto',
                marginRight: rhythm(0.5),
                marginBottom: 0,
                width: '26px',
                height: '26px',
                borderRadius: '26px',
              }}
            />
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                ...scale(-1 / 5),
              }}
            >
              perspectives
            </span>
          </Link>
        </div>
      );
    }

    return (
      <Fragment>
        {sideNav}
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(0.75)}`,
            ...this.props.style,
          }}
        >
          {header}
          {this.props.children}
          {footer}
        </div>
      </Fragment>
    );
  }
}

export default BaseLayout;
