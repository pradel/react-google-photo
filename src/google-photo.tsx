import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import ReactDom from 'react-dom';
import noScroll from 'no-scroll';
import cx from 'classnames';
import screenfull from 'screenfull';
import { CloseArrow, PrevArrowButton, NextArrowButton } from './arrow';
import { useEventListener } from './useEventListener';

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
  animationIn: 'react-google-photo-fade-in',
  animationOut: 'react-google-photo-fade-out',
};

const isBrowser = typeof window !== 'undefined';

enum Direction {
  Prev,
  Next,
}

interface GooglePhotoProps {
  /**
   * Control if GooglePhoto is open or not.
   */
  open: boolean;
  /**
   * An array containing valid images
   */
  src: {
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
  }[];
  /**
   * Index of source to display.
   */
  srcIndex?: number;
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
   * Animation duration in milliseconds.
   * Default to 250.
   */
  animationDuration?: number;
  /**
   * An object containing classNames to style the lightbox.
   */
  classNames?: {
    overlay?: string;
    image?: string;
    animationIn?: string;
    animationOut?: string;
  };
  /**
   * Function called when GooglePhoto is requested to be closed.
   */
  onClose: () => void;
  /**
   * Function called when the index of the displayed image is changing.
   */
  onChangeIndex?: (index: number) => void;
}

export const GooglePhoto = ({
  open,
  src,
  srcIndex: srcIndexProp = 0,
  fullscreen,
  keyboardNavigation = true,
  closeOnEsc = true,
  mouseIdleTimeout = 5000,
  animationDuration = 250,
  classNames,
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
  const [srcIndex, setSrcIndex] = useState(srcIndexProp);

  // Lazily create the ref instance
  // https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  if (refContainer.current === null && isBrowser) {
    refContainer.current = document.createElement('div');
  }

  const handleOpen = () => {
    noScroll.on();
    window.addEventListener('resize', handleWindowResize);
    if (refContainer.current && !document.body.contains(refContainer.current)) {
      document.body.appendChild(refContainer.current);
    }
    if (fullscreen && screenfull.isEnabled) {
      screenfull.request();
      screenfull.on('change', handleScreenfullChange);
    }
  };

  const handleClose = () => {
    window.removeEventListener('resize', handleWindowResize);
    if (refContainer.current && document.body.contains(refContainer.current)) {
      document.body.removeChild(refContainer.current);
    }
    if (screenfull.isEnabled) {
      screenfull.exit();
      screenfull.off('change', handleScreenfullChange);
    }
    noScroll.off();
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.keyCode === keycodes.left && keyboardNavigation) {
      handleChangeIndex(Direction.Prev);
    } else if (e.keyCode === keycodes.right && keyboardNavigation) {
      handleChangeIndex(Direction.Next);
    } else if (e.keyCode === keycodes.esc && closeOnEsc) {
      onClose();
    }
  };

  useEventListener(
    open,
    'keydown',
    handleKeydown,
    isBrowser ? document : undefined
  );

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

  useEventListener(
    open,
    'mousemove',
    handleMousemove,
    isBrowser ? document.querySelector('*')! : undefined
  );

  // We listen to the srcIndexProp to update the internal state if the user manage the component
  useEffect(() => {
    setSrcIndex(srcIndexProp);
  }, [srcIndexProp]);

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

  const handleChangeIndex = (direction: Direction) => {
    if (direction === Direction.Prev && srcIndex !== 0) {
      const newIndex = srcIndex - 1;
      onChangeIndex ? onChangeIndex(newIndex) : setSrcIndex(newIndex);
    } else if (direction === Direction.Next && src[srcIndex + 1]) {
      const newIndex = srcIndex + 1;
      onChangeIndex ? onChangeIndex(newIndex) : setSrcIndex(newIndex);
    }
  };

  const handleClickCloseArrow = () => {
    onClose();
  };

  const handleAnimationEnd = () => {
    if (!open) {
      setShowPortal(false);
      handleClose();
    }

    // if (onAnimationEnd) {
    //   onAnimationEnd();
    // }
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
        <div
          className={cx(classes.overlay, classNames?.overlay)}
          style={{
            animation: `${
              open
                ? classNames?.animationIn ?? classes.animationIn
                : classNames?.animationOut ?? classes.animationOut
            } ${animationDuration}ms`,
          }}
          onAnimationEnd={handleAnimationEnd}
        >
          <div style={wrapperImageStyle}>
            {src.map((source, index) => (
              <img
                key={index}
                src={source.src}
                alt={source.alt}
                width={wrapperImageStyle.width}
                height={wrapperImageStyle.height}
                className={cx(classes.image, classNames?.image, {
                  [classes.imageOpen]: index === srcIndex,
                })}
              />
            ))}
          </div>
          {srcIndex !== 0 && (
            <div
              className={cx(classes.column, classes.leftColumn)}
              onClick={() => handleChangeIndex(Direction.Prev)}
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
              onClick={() => handleChangeIndex(Direction.Next)}
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
