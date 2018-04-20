# react-google-photo

[![npm version](https://badge.fury.io/js/react-google-photo.svg)](https://badge.fury.io/js/react-google-photo)
[![CircleCI](https://circleci.com/gh/pradel/react-google-photo.svg?style=shield)](https://circleci.com/gh/pradel/react-google-photo)

react-google-photo is a responsive lightbox React Component for displaying photos that implements the google photo style.

## Docs and examples

You can find the docs and live examples [here](https://react-google-photo.leopradel.com/).

## Installation

With npm:

```
npm install react-google-photo --save
```

Or with yarn:

```
yarn add react-google-photo
```

## Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import GooglePhoto from 'react-google-photo';

const images = [
  {
    src: 'url-of-your-image',
    width: 749, // width of your image
    height: 1000, // height of your image
  },
  {
    ...
  }
];

export default class App extends React.Component {
  state = {
    index: 0,
    open: false,
  };

  handleClickPrev = () => {
    this.setState({ index: this.state.index - 1 });
  };

  handleClickNext = () => {
    this.setState({ index: this.state.index + 1 });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <button onClick={this.handleOpen}>Open</button>
        <GooglePhoto
          open={open}
          src={images}
          srcIndex={index}
          onClickPrev={this.handleClickPrev}
          onClickNext={this.handleClickNext}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

## Options

You can find the options [here](https://react-google-photo.leopradel.com/#options).
