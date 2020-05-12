# react-google-photo

[![npm version](https://badge.fury.io/js/react-google-photo.svg)](https://badge.fury.io/js/react-google-photo)
[![CircleCI](https://circleci.com/gh/pradel/react-google-photo.svg?style=shield)](https://circleci.com/gh/pradel/react-google-photo)

react-google-photo is a responsive lightbox React Component for displaying photos that implements the google photo style.

- Responsive.
- Keyboard navigation.
- Easily customizable via props.

## Documentation

📚 You can find the docs and live examples [here](https://react-google-photo.leopradel.com/).

- [Getting started](https://react-google-photo.leopradel.com/)
  - [Installation](https://react-google-photo.leopradel.com/#installation)
  - [Usage](https://react-google-photo.leopradel.com/#usage)
  - [Props](https://react-google-photo.leopradel.com/#props)
  - [Licence](https://react-google-photo.leopradel.com/#license)

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
import 'react-google-photo/styles.css';
import GooglePhoto from 'react-google-photo';

const App = () => {
  const [open, setOpen] = React.useState(false);

const images = [
    {
      src:
        'https://images.unsplash.com/photo-1509420316987-d27b02f81864?dpr=1&auto=format&fit=crop&w=1500&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
      width: 1500,
      height: 1000,
    },
    ...
  ];

  return (
    <div>
      <button onClick={this.handleOpen}>Open</button>
      <GooglePhoto
        open={open}
        src={images}
        onClose={this.handleClose}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
```

## Props

Check the documentation: https://react-google-photo.leopradel.com/#props.

## License

MIT © [Léo Pradel](https://www.leopradel.com/)
