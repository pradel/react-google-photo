## Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
varius ex a libero blandit sollicitudin. Suspendisse potenti.
Curabitur fermentum justo nisi, nec consectetur purus dictum
sed. Integer facilisis aliquam nulla eget pretium. In
imperdiet lectus ante, a molestie lacus viverra vitae. Sed
condimentum elit sed nisl consectetur iaculis. Proin hendrerit
enim justo, nec mattis orci malesuada ac. Praesent dignissim
dapibus tempus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
varius ex a libero blandit sollicitudin. Suspendisse potenti.
Curabitur fermentum justo nisi, nec consectetur purus dictum
sed. Integer facilisis aliquam nulla eget pretium. In
imperdiet lectus ante, a molestie lacus viverra vitae. Sed
condimentum elit sed nisl consectetur iaculis. Proin hendrerit
enim justo, nec mattis orci malesuada ac. Praesent dignissim
dapibus tempus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
varius ex a libero blandit sollicitudin. Suspendisse potenti.
Curabitur fermentum justo nisi, nec consectetur purus dictum
sed. Integer facilisis aliquam nulla eget pretium. In
imperdiet lectus ante, a molestie lacus viverra vitae. Sed
condimentum elit sed nisl consectetur iaculis. Proin hendrerit
enim justo, nec mattis orci malesuada ac. Praesent dignissim
dapibus tempus.

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
