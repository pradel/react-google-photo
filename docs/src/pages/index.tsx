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

interface Props {
  data: any;
}

interface State {
  index: number;
  open: boolean;
}

class IndexPage extends React.Component<Props, State> {
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
    const { data } = this.props;
    const { open, index } = this.state;
    const page = data.allMarkdownRemark.edges[0].node;
    console.log(page);
    return (
      <div className="container mx-auto mt-16">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/6">
            <Menu>
              <MenuList>
                <MenuListItem>
                  <MenuListItemA href="#introduction">
                    Introduction
                  </MenuListItemA>
                </MenuListItem>
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
          <div className="lg:w-5/6">
            <div className="pb-8 flex">
              <div className="markdown-body w-100">
                <div dangerouslySetInnerHTML={{ __html: page.html }} />

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

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          html
        }
      }
    }
  }
`;
