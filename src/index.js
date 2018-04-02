// @flow

import * as React from 'react';
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

type Image = {
  /**
   * Url of the media
   */
  src: number,
  /**
   * Height of the media
   */
  height: number,
  /**
   * Width of the media
   */
  width: number,
  /**
   * Description of the media
   */
  alt?: string,
};

type Props = {
  /**
   * Control if GooglePhoto is open or not
   */
  open: boolean,
  /**
   * An array containing valid images
   */
  src: Image[],
  /**
   * Index of source to display
   */
  srcIndex: number,
  /**
   * Is closable when user press esc key
   */
  closeOnEsc: boolean,
  /**
   * Enable left and right arrow navigation
   */
  keyboardNavigation: boolean,
  /**
   * The duration of the transition, in milliseconds
   * https://reactcommunity.org/react-transition-group/#Transition-prop-timeout
   */
  transitionDuration: number,
  /**
   * The animation object see https://reactcommunity.org/react-transition-group/#Transition
   * Add a default key to still the default style
   */
  transitionStyles: Object,
  /**
   * Should open on fullscreen mode
   */
  fullscreen: boolean,
  /**
   * Timeout before hidding the actions buttons when mouse do not move (milliseconds)
   */
  mouseIdleTimeout: number,
  /**
   * Function called when the previous image is requested
   */
  onClickPrev: Function,
  /**
   * Function called when the next image is requested
   */
  onClickNext: Function,
  /**
   * Function called when GooglePhoto is requested to be closed
   */
  onClose: Function,
  /**
   * Object of classes to style the element
   */
  classes: Object,
};

type State = {
  width: number,
  height: number,
  mouseIdle: boolean,
  showPortal: boolean,
};

class GooglePhoto extends React.Component<Props, State> {
  static defaultProps = {
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

  timeoutMouseIdle: any;

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
    const element = document.querySelector('*');
    if (element) {
      element.addEventListener('mousemove', this.handleMousemove);
    }
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
    const element = document.querySelector('*');
    if (element) {
      element.removeEventListener('mousemove', this.handleMousemove);
    }
    noScroll.off();
  }

  handleWindowResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  handleKeydown = (e: KeyboardEvent) => {
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
      left: 0,
      height: 0,
      width: 0,
      top: 0,
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

export default injectSheet(styles)(GooglePhoto);
