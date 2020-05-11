import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import ReactDom from 'react-dom';
import noScroll from 'no-scroll';
import cx from 'classnames';
import screenfull from 'screenfull';
import { CloseArrow, PrevArrowButton, NextArrowButton } from './arrow';

const keycodes = {
  esc: 27,
  left: 37,
  right: 39,
};

const classes = {
  overlay: 'react-google-photo-overlay',
  column: 'react-google-photo-column',
  leftColumn: 'react-google-photo-left-column',
  rightColumn: 'react-google-photo-right-column',
  arrowButton: 'react-google-photo-arrow-button',
  arrowButtonHide: 'react-google-photo-arrow-button-hide',
  arrowButtonLeft: 'react-google-photo-arrow-button-left',
  arrowButtonRight: 'react-google-photo-arrow-button-right',
  arrowButtonReturn: 'react-google-photo-arrow-button-return',
  image: 'react-google-photo-overlay-image',
  imageOpen: 'react-google-photo-overlay-image-open',
};

const isBrowser = typeof window !== 'undefined';

interface SrcImage {
  /**
   * Url of the media.
   */
  src: string;
  /**
   * Height of the media.
   */
  height: number;
  /**
   * Width of the media.
   */
  width: number;
  /**
   * Alt of the media.
   */
  alt?: string;
}

interface GooglePhotoProps {
  /**
   * Control if GooglePhoto is open or not.
   */
  open: boolean;
  /**
   * An array containing valid images
   */
  src: SrcImage[];
  /**
   * Index of source to display.
   */
  srcIndex: number;
  /**
   * Should open on fullscreen mode.
   * Default to false.
   */
  fullscreen?: boolean;
  /**
   * Enable left and right arrow navigation.
   * Default to true.
   */
  keyboardNavigation?: boolean;
  /**
   * Should close when user press esc key.
   * Default to true.
   */
  closeOnEsc?: boolean;
  /**
   * Timeout before hidding the actions buttons when mouse do not move (milliseconds).
   * Default to 5000.
   */
  mouseIdleTimeout?: number;
  /**
   * Function called when GooglePhoto is requested to be closed.
   */
  onClose: () => void;
  /**
   * Function called when the index of the displayed image is changing.
   */
  onChangeIndex: (index: number) => void;
}

export const GooglePhoto = ({
  open,
  src,
  srcIndex,
  fullscreen,
  keyboardNavigation = true,
  closeOnEsc = true,
  mouseIdleTimeout = 5000,
  onClose,
  onChangeIndex,
}: GooglePhotoProps) => {
  const refContainer = useRef<HTMLDivElement | null>(null);
  const refTimeoutMouseIdle = useRef<NodeJS.Timeout | null>(null);
  const [showPortal, setShowPortal] = useState(open);
  const [windowSizes, setWindowSizes] = useState<{
    width: number;
    height: number;
  }>({
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0,
  });
  const [mouseIdle, setMouseIdle] = useState(false);

  // Lazily create the ref instance
  // https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  if (refContainer.current === null && isBrowser) {
    refContainer.current = document.createElement('div');
  }

  const handleOpen = () => {
    noScroll.on();
    document.addEventListener('keydown', handleKeydown);
    window.addEventListener('resize', handleWindowResize);
    document.querySelector('*')!.addEventListener('mousemove', handleMousemove);
    if (refContainer.current && !document.body.contains(refContainer.current)) {
      document.body.appendChild(refContainer.current);
    }
    if (fullscreen && screenfull.isEnabled) {
      screenfull.request();
      screenfull.on('change', handleScreenfullChange);
    }
  };

  const handleClose = () => {
    document.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('resize', handleWindowResize);
    document
      .querySelector('*')!
      .removeEventListener('mousemove', handleMousemove);
    if (screenfull.isEnabled) {
      screenfull.off('change', handleScreenfullChange);
    }
    noScroll.off();
  };

  useEffect(() => {
    // When the modal is rendered first time we want to block the scroll
    if (open) {
      handleOpen();
    }
    return () => {
      // When the component is unmounted directly we want to unblock the scroll
      if (showPortal) {
        handleClose();
      }
    };
  }, []);

  useEffect(() => {
    // If the open prop is changing, we need to open the modal
    if (open && !showPortal) {
      setShowPortal(true);
      handleOpen();
    }
  }, [open]);

  const handleScreenfullChange = () => {
    if (screenfull.isEnabled && !screenfull.isFullscreen && open) {
      onClose();
    }
  };

  const handleWindowResize = () => {
    setWindowSizes({ width: window.innerWidth, height: window.innerHeight });
  };

  const handleKeydown = (e: KeyboardEvent) => {
    console.log(e.keyCode);
    if (e.keyCode === keycodes.left && keyboardNavigation) {
      handleClickPrev();
    } else if (e.keyCode === keycodes.right && keyboardNavigation) {
      handleClickNext();
    } else if (e.keyCode === keycodes.esc && closeOnEsc) {
      handleClose();
      onClose();
    }
  };

  const handleMousemove = () => {
    // Hide the actions buttons when move do not move for x seconds
    if (refTimeoutMouseIdle.current) {
      clearTimeout(refTimeoutMouseIdle.current);
    }
    if (mouseIdle === true) {
      setMouseIdle(false);
    }
    refTimeoutMouseIdle.current = setTimeout(() => {
      setMouseIdle(true);
    }, mouseIdleTimeout);
  };

  const handleClickPrev = () => {
    if (srcIndex !== 0) {
      onChangeIndex(srcIndex - 1);
    }
  };

  const handleClickNext = () => {
    if (src[srcIndex + 1]) {
      onChangeIndex(srcIndex + 1);
    }
  };

  const handleClickCloseArrow = () => {
    onClose();
  };

  const image = src[srcIndex];
  const wrapperImageStyle: CSSProperties = {
    position: 'absolute',
    overflow: 'hidden',
    userSelect: 'none',
  };
  let imageWidth = image.width;
  let imageHeight = image.height;
  // Adjust image ratio max with window size
  if (imageWidth > windowSizes.width) {
    const ratio = windowSizes.width / imageWidth;
    imageHeight *= ratio;
    imageWidth *= ratio;
  }
  if (imageHeight > windowSizes.height) {
    const ratio = windowSizes.height / imageHeight;
    imageHeight *= ratio;
    imageWidth *= ratio;
  }

  if (imageHeight > imageWidth || imageWidth < windowSizes.width) {
    wrapperImageStyle.left = (windowSizes.width - imageWidth) / 2;
    wrapperImageStyle.height = windowSizes.height;
    wrapperImageStyle.width = imageWidth;
  } else {
    wrapperImageStyle.top = (windowSizes.height - imageHeight) / 2;
    wrapperImageStyle.height = imageHeight;
    wrapperImageStyle.width = windowSizes.width;
  }
  if (windowSizes.height > imageHeight) {
    wrapperImageStyle.height = imageHeight;
    wrapperImageStyle.top = (windowSizes.height - imageHeight) / 2;
  } else if (windowSizes.width > imageWidth) {
    wrapperImageStyle.height = windowSizes.height;
    wrapperImageStyle.left = (windowSizes.width - imageWidth) / 2;
  }

  return showPortal && refContainer.current
    ? ReactDom.createPortal(
        <div className={cx(classes.overlay)}>
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
              onClick={handleClickPrev}
            >
              <PrevArrowButton
                className={cx(classes.arrowButton, classes.arrowButtonLeft, {
                  [classes.arrowButtonHide]: mouseIdle,
                })}
              />
            </div>
          )}
          {src[srcIndex + 1] && (
            <div
              className={cx(classes.column, classes.rightColumn)}
              onClick={handleClickNext}
            >
              <NextArrowButton
                className={cx(classes.arrowButton, classes.arrowButtonRight, {
                  [classes.arrowButtonHide]: mouseIdle,
                })}
              />
            </div>
          )}
          <div onClick={handleClickCloseArrow}>
            <CloseArrow
              className={cx(classes.arrowButtonReturn, {
                [classes.arrowButtonHide]: mouseIdle,
              })}
            />
          </div>
        </div>,
        refContainer.current
      )
    : null;
};
