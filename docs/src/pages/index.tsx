import * as React from 'react';
import * as rehypeReact from 'rehype-react';
import { withPage } from '../theme';
import { Example } from '../components/Example';
import { ExampleFullScreen } from '../components/ExampleFullScreen';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'example-basic': Example,
    'example-fullscreen': ExampleFullScreen,
  },
}).Compiler;

const config = {
  version: '0.0.2',
  meta: {
    title: 'react-google-photo',
    description: 'A react lightbox component',
    keywords: 'react, lightbox, google, photo',
  },
  sidebar: [
    {
      title: 'Introduction',
      path: '#introduction',
    },
    {
      title: 'Getting started',
      path: '#getting-started',
    },
    {
      title: 'Usage',
      path: '#usage',
    },
    {
      title: 'Examples',
      path: '#examples',
    },
    {
      title: 'Options',
      path: '#options',
    },
    {
      title: 'License',
      path: '#license',
    },
  ],
};

export default withPage(config, renderAst);

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
