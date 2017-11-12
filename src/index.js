import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-minimalist-portal';
import Transition from 'react-transition-group/Transition';
import noScroll from 'no-scroll';
import styles from './styles';
import { PrevArrowButton, NextArrowButton } from './arrow';

const keycodes = {
  left: 37,
  right: 39,
};

export default class GooglePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      isHoveringLeft: false,
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
      this.props.onClickPrev();
    } else if (e.keyCode === keycodes.right) {
      this.props.onClickNext();
    }
  };

  handleClickPrev = () => {
    this.props.onClickPrev();
  };

  handleClickNext = () => {
    this.props.onClickNext();
  };

  render() {
    const { open, src, srcIndex } = this.props;
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
    return (
      <Portal>
        <div style={styles.overlay}>
          <div style={wrapperImageStyle}>
            {src.map((source, index) => (
              <img
                key={index}
                src={source.src}
                width={wrapperImageStyle.width}
                height={wrapperImageStyle.height}
                style={
                  index === srcIndex ? styles.imageOpen : styles.image
                }
              />
            ))}
          </div>
          <div
            style={{ ...styles.column, ...styles.leftColumn }}
            onClick={this.handleClickPrev}
          >
            <PrevArrowButton />
          </div>
          <div
            style={{ ...styles.column, ...styles.rightColumn }}
            onClick={this.handleClickNext}
          >
            <NextArrowButton />
          </div>
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
};
