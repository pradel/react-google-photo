import * as React from 'react';
import {
  Menu,
  MenuLabel,
  MenuList,
  MenuListItem,
  MenuListItemA,
} from '../theme';
import { Example } from '../components/Example';

interface Props {
  data: any;
}

class IndexPage extends React.Component<Props, {}> {
  render() {
    const { data } = this.props;
    const page = data.allMarkdownRemark.edges[0].node;
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
              <div className="w-100">
                <div dangerouslySetInnerHTML={{ __html: page.html }} />

                <Example />
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
