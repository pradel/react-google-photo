import * as React from 'react';
import Gallery from 'react-photo-gallery';
import GooglePhoto from '../../../lib/index';
import {
  Menu,
  MenuLabel,
  MenuList,
  MenuListItem,
  MenuListItemA,
} from '../theme';

// https://unsplash.com/collections/589374/textures
const images = [
  {
    src:
      'https://images.unsplash.com/photo-1509420316987-d27b02f81864?dpr=1&auto=format&fit=crop&w=1500&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    width: 1500,
    height: 1000,
  },
  {
    src:
      'https://images.unsplash.com/photo-1509641498745-13c26fd1ed89?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    width: 666,
    height: 1000,
  },
  {
    src:
      'https://images.unsplash.com/photo-1491146179969-d674118945ff?dpr=1&auto=format&fit=crop&w=1500&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    width: 1500,
    height: 844,
  },
  {
    src:
      'https://images.unsplash.com/photo-1486231328412-f20a348f9837?dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    width: 749,
    height: 1000,
  },
];

class IndexPage extends React.Component<{}, {}> {
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

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickGallery = (e: any, data: any) => {
    this.setState({ open: true, index: data.index });
  };

  render() {
    const { open, index } = this.state;
    return (
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/4">
            <Menu>
              <MenuList>
                <MenuListItem>
                  <MenuListItemA href="#getting-started">
                    Getting started
                  </MenuListItemA>
                </MenuListItem>
                <MenuListItem>
                  <MenuListItemA href="#examples">Examples</MenuListItemA>
                </MenuListItem>
                <MenuListItem>
                  <MenuListItemA href="#usage">Usage</MenuListItemA>
                </MenuListItem>
                <MenuListItem>
                  <MenuListItemA href="#options">Options</MenuListItemA>
                </MenuListItem>
              </MenuList>
            </Menu>
          </div>
          <div className="w-3/4">
            <div className="pb-8 flex">
              <div className="markdown-body mt-8">
                <h2 id="getting-started">Getting Started</h2>
                <p>Start by installing the module</p>
                <pre>
                  <code>yarn add react-google-photo</code>
                </pre>

                <h3 id="examples">Examples</h3>
                <Gallery photos={images} onClick={this.handleClickGallery} />
                <GooglePhoto
                  open={open}
                  src={images}
                  srcIndex={index}
                  onClickPrev={this.handleClickPrev}
                  onClickNext={this.handleClickNext}
                  onClose={this.handleClose}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexPage;
