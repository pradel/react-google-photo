import * as React from 'react';
import * as rehypeReact from 'rehype-react';
import {
  Menu,
  MenuLabel,
  MenuList,
  MenuListItem,
  MenuListItemLink,
} from '../theme';
import { Example } from '../components/Example';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 'example-basic': Example },
}).Compiler;

interface Props {
  data: any;
}

class IndexPage extends React.Component<Props, {}> {
  render() {
    const { data } = this.props;
    const page = data.allMarkdownRemark.edges[0].node;
    return (
      <div className="container mx-auto pb-8" style={{ marginTop: '8rem' }}>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/6 px-4">
            <Menu>
              <MenuList>
                <MenuListItem>
                  <MenuListItemLink to="#introduction">
                    Introduction
                  </MenuListItemLink>
                </MenuListItem>
                <MenuListItem>
                  <MenuListItemLink to="#getting-started">
                    Getting started
                  </MenuListItemLink>
                </MenuListItem>
                <MenuListItem>
                  <MenuListItemLink to="#usage">Usage</MenuListItemLink>
                </MenuListItem>
                <MenuListItem>
                  <MenuListItemLink to="#examples">Examples</MenuListItemLink>
                </MenuListItem>
                <MenuListItem>
                  <MenuListItemLink to="#options">Options</MenuListItemLink>
                </MenuListItem>
                <MenuListItem>
                  <MenuListItemLink to="#license">License</MenuListItemLink>
                </MenuListItem>
              </MenuList>
            </Menu>
          </div>
          <div className="lg:w-5/6 px-4">
            <div className="flex">
              <div className="w-100 markdown-content">
                {renderAst(page.htmlAst)}
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
          htmlAst
        }
      }
    }
  }
`;
