import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import '../styles/tailwind-generated.css';
import { Footer } from '../components/Footer';

const IndexLayout: React.SFC = ({ children }: any) => (
  <React.Fragment>
    <Helmet
      title="react-google-photo"
      meta={[
        { name: 'description', content: 'A react lightbox component' },
        { name: 'keywords', content: 'react, google, photo' },
      ]}
      htmlAttributes={{
        className: 'bg-white antialiased',
      }}
      bodyAttributes={{
        className: 'font-normal text-black leading-normal',
      }}
    />
    {children()}
    {/* <Footer /> */}
  </React.Fragment>
);

export default IndexLayout;
