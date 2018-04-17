import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import 'prismjs/themes/prism-solarizedlight.css';
import '../styles/tailwind-generated.css';
import { Header } from '../components/Header';

const projectName = 'react-google-photo';

const IndexLayout: React.SFC = ({ children }: any) => (
  <React.Fragment>
    <Helmet
      title="react-google-photo"
      meta={[
        { name: 'description', content: 'A react lightbox component' },
        { name: 'keywords', content: 'react, lightbox, google, photo' },
      ]}
      htmlAttributes={{
        class: 'bg-white antialiased',
      }}
      bodyAttributes={{
        class: 'text-black',
      }}
    />
    <Header projectName={projectName} />
    {children()}
  </React.Fragment>
);

export default IndexLayout;
