// @flow

export default {
  overlay: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  column: {
    position: 'absolute',
    width: '30%',
    top: 0,
    bottom: 0,
    cursor: 'pointer',
    transition: 'opacity 200ms ease',
    opacity: 0,
    '&:hover': {
      opacity: 1,
    },
  },
  leftColumn: {
    left: 0,
  },
  rightColumn: {
    right: 0,
  },
  arrowButtonReturn: {
    height: 48,
    width: 48,
    position: 'absolute',
    top: 8,
    left: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'opacity 200ms ease',
    opacity: 1,
  },
  arrowButton: {
    backgroundColor: 'rgba(66,66,66,0.54)',
    borderRadius: 28,
    position: 'absolute',
    top: '50%',
    marginTop: -28,
    height: 56,
    width: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 200ms ease',
    opacity: 1,
  },
  arrowButtonHide: {
    opacity: 0,
  },
  arrowButtonLeft: {
    left: 28,
  },
  arrowButtonRight: {
    right: 28,
  },
  image: {
    position: 'absolute',
    visibility: 'hidden',
    opacity: 0,
    transform: 'translateX(50px)',
    transition: 'opacity 500ms ease, transform 500ms ease',
  },
  imageOpen: {
    visibility: 'initial',
    opacity: 1,
    transform: 'translateX(0px)',
  },
};
