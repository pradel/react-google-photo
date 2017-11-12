import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-minimalist-portal';
import Transition from 'react-transition-group/Transition';
import noScroll from 'no-scroll';
import injectSheet from 'react-jss';
import cx from 'classnames';
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
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('resize', this.handleWindowResize);
    if (this.props.open) {
      noScroll.on();
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
  }

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
          {srcIndex !== 0 && <div
            className={cx(classes.column, classes.leftColumn)}
            onClick={this.handleClickPrev}
          >
            <PrevArrowButton />
          </div>}
          {src[srcIndex + 1] && <div
            className={cx(classes.column, classes.rightColumn)}
            onClick={this.handleClickNext}
          >
            <NextArrowButton />
          </div>}
        </div>
      </Portal>
    );
  }
}

GooglePhoto.propTypes = {
  open: PropTypes.bool.isRequired,
  src: PropTypes.any.isRequired,
  srcIndex: PropTypes.number.isRequired,
  onClickPrev: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(GooglePhoto);
