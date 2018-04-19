import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-minimalist-portal';
import Transition from 'react-transition-group/Transition';
import injectSheet from 'react-jss';
import noScroll from 'no-scroll';
import cx from 'classnames';
import screenfull from 'screenfull';
import styles from './styles';
import { CloseArrow, PrevArrowButton, NextArrowButton } from './arrow';

const keycodes = {
  esc: 27,
  left: 37,
  right: 39,
};

class GooglePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
      mouseIdle: false,
      showPortal: props.open,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('resize', this.handleWindowResize);
    document
      .querySelector('*')
      .addEventListener('mousemove', this.handleMousemove);
    if (this.props.open) {
      noScroll.on();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      noScroll.on();
      this.setState({ showPortal: true });
      if (this.props.fullscreen && screenfull.enabled) {
        screenfull.request();
      }
    }
    if (this.props.open && !nextProps.open) {
      noScroll.off();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('resize', this.handleWindowResize);
    document
      .querySelector('*')
      .removeEventListener('mousemove', this.handleMousemove);
    noScroll.off();
  }

  handleWindowResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  handleKeydown = e => {
    if (e.keyCode === keycodes.left && this.props.keyboardNavigation) {
      this.handleClickPrev();
    } else if (e.keyCode === keycodes.right && this.props.keyboardNavigation) {
      this.handleClickNext();
    } else if (e.keyCode === keycodes.esc && this.props.closeOnEsc) {
      this.handleClose();
    }
  };

  handleMousemove = () => {
    // Hide the actions buttons when move do not move for x seconds
    clearTimeout(this.timeoutMouseIdle);
    if (this.state.mouseIdle === true) {
      this.setState({ mouseIdle: false });
    }
    this.timeoutMouseIdle = setTimeout(() => {
      this.setState({ mouseIdle: true });
    }, this.props.mouseIdleTimeout);
  };

  handleClickPrev = () => {
    if (this.props.srcIndex !== 0) {
      this.props.onClickPrev();
    }
  };

  handleClickNext = () => {
    if (this.props.src[this.props.srcIndex + 1]) {
      this.props.onClickNext();
    }
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleExited = () => {
    this.setState({ showPortal: false });
  };

  render() {
    const {
      open,
      src,
      srcIndex,
      classes,
      transitionDuration,
      transitionStyles,
    } = this.props;
    const { width, height, mouseIdle, showPortal } = this.state;
    const image = src[srcIndex];
    const wrapperImageStyle = {
      position: 'absolute',
      overflow: 'hidden',
      userSelect: 'none',
    };
    let imageWidth = image.width;
    let imageHeight = image.height;
    // Adjust image ratio max with window size
    if (imageWidth > width) {
      const ratio = width / imageWidth;
      imageHeight *= ratio;
      imageWidth *= ratio;
    }
    if (imageHeight > height) {
      const ratio = height / imageHeight;
      imageHeight *= ratio;
      imageWidth *= ratio;
    }

    if (imageHeight > imageWidth || imageWidth < width) {
      wrapperImageStyle.left = (width - imageWidth) / 2;
      wrapperImageStyle.height = height;
      wrapperImageStyle.width = imageWidth;
    } else {
      wrapperImageStyle.top = (height - imageHeight) / 2;
      wrapperImageStyle.height = imageHeight;
      wrapperImageStyle.width = width;
    }
    if (height > imageHeight) {
      wrapperImageStyle.height = imageHeight;
      wrapperImageStyle.top = (height - imageHeight) / 2;
    } else if (width > imageWidth) {
      wrapperImageStyle.height = height;
      wrapperImageStyle.left = (width - imageWidth) / 2;
    }

    if (!showPortal) {
      return false;
    }

    return (
      <Portal>
        <Transition
          in={open}
          timeout={transitionDuration}
          appear
          onExited={this.handleExited}
        >
          {state => (
            <div
              className={classes.overlay}
              style={{
                ...transitionStyles.default,
                ...transitionStyles[state],
              }}
            >
              <div style={wrapperImageStyle}>
                {src.map((source, index) => (
                  <img
                    key={index}
                    src={source.src}
                    alt={source.alt}
                    width={wrapperImageStyle.width}
                    height={wrapperImageStyle.height}
                    className={cx(classes.image, {
                      [classes.imageOpen]: index === srcIndex,
                    })}
                  />
                ))}
              </div>
              {srcIndex !== 0 && (
                <div
                  className={cx(classes.column, classes.leftColumn)}
                  onClick={this.handleClickPrev}
                >
                  <PrevArrowButton
                    className={cx(
                      classes.arrowButton,
                      classes.arrowButtonLeft,
                      {
                        [classes.arrowButtonHide]: mouseIdle,
                      }
                    )}
                  />
                </div>
              )}
              {src[srcIndex + 1] && (
                <div
                  className={cx(classes.column, classes.rightColumn)}
                  onClick={this.handleClickNext}
                >
                  <NextArrowButton
                    className={cx(
                      classes.arrowButton,
                      classes.arrowButtonRight,
                      {
                        [classes.arrowButtonHide]: mouseIdle,
                      }
                    )}
                  />
                </div>
              )}
              <CloseArrow
                className={cx(classes.arrowButtonReturn, {
                  [classes.arrowButtonHide]: mouseIdle,
                })}
                onClick={this.handleClose}
              />
            </div>
          )}
        </Transition>
      </Portal>
    );
  }
}

GooglePhoto.propTypes = {
  /**
   * Control if GooglePhoto is open or not
   */
  open: PropTypes.bool.isRequired,
  /**
   * An array containing valid images
   */
  src: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Url of the media
       */
      src: PropTypes.string.isRequired,
      /**
       * Height of the media
       */
      height: PropTypes.number.isRequired,
      /**
       * Width of the media
       */
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  /**
   * Index of source to display
   */
  srcIndex: PropTypes.number.isRequired,
  /**
   * Is closable when user press esc key
   */
  closeOnEsc: PropTypes.bool,
  /**
   * Enable left and right arrow navigation
   */
  keyboardNavigation: PropTypes.bool,
  /**
   * The duration of the transition, in milliseconds see [react-transition-group docs](https://reactcommunity.org/react-transition-group/#Transition-prop-timeout)
   */
  transitionDuration: PropTypes.number,
  /**
   * The animation object see [react-transition-group docs](https://reactcommunity.org/react-transition-group/#Transition)
   * Add a default key to still the default style
   */
  // eslint-disable-next-line
  transitionStyles: PropTypes.object,
  /**
   * Should open on fullscreen mode
   */
  fullscreen: PropTypes.bool,
  /**
   * Timeout before hidding the actions buttons when mouse do not move (milliseconds)
   */
  mouseIdleTimeout: PropTypes.number,
  /**
   * Function called when the previous image is requested
   */
  onClickPrev: PropTypes.func.isRequired,
  /**
   * Function called when the next image is requested
   */
  onClickNext: PropTypes.func.isRequired,
  /**
   * Function called when GooglePhoto is requested to be closed
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Object of classes to style the element
   */
  // eslint-disable-next-line
  classes: PropTypes.object.isRequired,
};

GooglePhoto.defaultProps = {
  closeOnEsc: true,
  keyboardNavigation: true,
  fullscreen: false,
  mouseIdleTimeout: 5000,
  transitionDuration: 200,
  transitionStyles: {
    default: {
      transition: `opacity 200ms ease-in-out`,
      opacity: 0,
    },
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
  },
};

export default injectSheet(styles)(GooglePhoto);
