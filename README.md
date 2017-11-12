# react-google-photo

[![npm version](https://badge.fury.io/js/react-google-photo.svg)](https://badge.fury.io/js/react-google-photo)


## Demo

You can find a demo [here](https://react-google-photo.leopradel.com/).

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/TPcxj3ZMAXdSxzhvJ7SzjaQY/pradel/react-google-photo'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/TPcxj3ZMAXdSxzhvJ7SzjaQY/pradel/react-google-photo.svg' />
</a>

## Installation

With npm:
```
npm install react-responsive-modal --save
```

Or with yarn:
```
yarn add react-responsive-modal
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

Property | Type | Default | Description
---- | :----: | :-------: | -----------
**open*** | Boolean |  | Control if GooglePhoto is open or not
**src*** | Array |  | An array containing valid images
**srcIndex*** | Number |  | Index of source to display
fullscreen | Boolean | false | Should open on fullscreen mode
**onClickPrev*** | Function |  | Function called when the previous image is requested
**onClickNext*** | Function |  | Function called when the next image is requested
**onClose*** | Function |  | Function called when GooglePhoto is requested to be closed
**classes*** | Object |  | Object of classes to style the element
