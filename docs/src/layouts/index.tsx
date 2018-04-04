import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import '../styles/style.scss';
import { Footer } from '../components/Footer';

const IndexLayout: React.SFC = ({ children }: any) => (
  <React.Fragment>
    <Helmet
      title="react-google-photo"
      meta={[
        { name: 'description', content: 'A react lightbox component' },
        { name: 'keywords', content: 'react, google, photo' },
      ]}
    />
    {children()}
    <Footer />
  </React.Fragment>
);

export default IndexLayout;
