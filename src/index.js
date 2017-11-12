import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-minimalist-portal';
import Transition from 'react-transition-group/Transition';
import injectSheet from 'react-jss';
import noScroll from 'no-scroll';
import cx from 'classnames';
import screenfull from 'screenfull';
import styles from './styles';
import { PrevArrowButton, NextArrowButton } from './arrow';

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
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('resize', this.handleWindowResize);
    if (this.props.open) {
      noScroll.on();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      noScroll.on();
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
    noScroll.off();
  }

  handleWindowResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  handleKeydown = e => {
    if (e.keyCode === keycodes.left) {
      this.handleClickPrev();
    } else if (e.keyCode === keycodes.right) {
      this.handleClickNext();
    } else if (e.keyCode === keycodes.esc) {
      this.handleClose();
    }
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

  render() {
    const { open, src, srcIndex, classes } = this.props;
    const { width, height } = this.state;
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
      imageHeight = imageHeight * ratio;
      imageWidth = imageWidth * ratio;
    }
    if (imageHeight > height) {
      const ratio = height / imageHeight;
      imageHeight = imageHeight * ratio;
      imageWidth = imageWidth * ratio;
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
    if (!open) {
      return null;
    }
    return (
      <Portal>
        <div className={classes.overlay}>
          <div style={wrapperImageStyle}>
            {src.map((source, index) => (
              <img
                key={index}
                src={source.src}
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
              <PrevArrowButton />
            </div>
          )}
          {src[srcIndex + 1] && (
            <div
              className={cx(classes.column, classes.rightColumn)}
              onClick={this.handleClickNext}
            >
              <NextArrowButton />
            </div>
          )}
        </div>
      </Portal>
    );
  }
}

GooglePhoto.propTypes = {
  /**
   * Control if GooglePhoto is open or not.
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
   * Should open on fullscreen mode
   */
  fullscreen: PropTypes.bool,
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
  classes: PropTypes.object.isRequired,
};

GooglePhoto.defaultProps = {
  fullscreen: false,
};

export default injectSheet(styles)(GooglePhoto);
