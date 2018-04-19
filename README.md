# react-google-photo

[![npm version](https://badge.fury.io/js/react-google-photo.svg)](https://badge.fury.io/js/react-google-photo)

react-google-photo is a responsive lightbox React Component for displaying photos that implements the google photo style.

## Demo

You can find a demo [here](https://react-google-photo.leopradel.com/).

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

### GooglePhoto

| Name                                         | Type                      | Default | Description                                                                                                                                                   |
| -------------------------------------------- | ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **open\***                                   | `bool`                    |         | Control if GooglePhoto is open or not                                                                                                                         |
| **src\***                                    | `arrayOf[GooglePhotoSrc]` |         | An array containing valid images                                                                                                                              |
| **srcIndex\***                               | `number`                  |         | Index of source to display                                                                                                                                    |
| closeOnEsc                                   | `bool`                    | `true`  | Is closable when user press esc key                                                                                                                           |
| keyboardNavigation                           | `bool`                    | `true`  | Enable left and right arrow navigation                                                                                                                        |
| transitionDuration                           | `number`                  | `200`   | The duration of the transition, in milliseconds see [react-transition-group docs](https://reactcommunity.org/react-transition-group/#Transition-prop-timeout) |
| transitionStyles                             | `object`                  |         | The animation object see [react-transition-group docs](https://reactcommunity.org/react-transition-group/#Transition)                                         |
| Add a default key to still the default style |
| fullscreen                                   | `bool`                    | `false` | Should open on fullscreen mode                                                                                                                                |
| mouseIdleTimeout                             | `number`                  | `5000`  | Timeout before hidding the actions buttons when mouse do not move (milliseconds)                                                                              |
| **onClickPrev\***                            | `func`                    |         | Function called when the previous image is requested                                                                                                          |
| **onClickNext\***                            | `func`                    |         | Function called when the next image is requested                                                                                                              |
| **onClose\***                                | `func`                    |         | Function called when GooglePhoto is requested to be closed                                                                                                    |
| **classes\***                                | `object`                  |         | Object of classes to style the element                                                                                                                        |

### GooglePhotoSrc

| Name         | Type     | Default | Description         |
| ------------ | -------- | ------- | ------------------- |
| **src\***    | `string` |         | Url of the media    |
| **height\*** | `number` |         | Height of the media |
| **width\***  | `number` |         | Width of the media  |  |
