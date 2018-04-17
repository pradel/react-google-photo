## Introduction

react-google-photo is a responsive lightbox React Component for displaying photos that implements the google photo style.

## Getting Started

Start by installing the module

```
yarn add react-google-photo
# OR with npm
npm install react-google-photo
```

## Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import GooglePhoto from 'react-google-photo';

const images = [...];

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
  }

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

## Examples

TODO
