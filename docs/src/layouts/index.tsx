import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import 'github-markdown-css/github-markdown.css';
import '../styles/tailwind-generated.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const projectName = 'react-responsive-modal';

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
    <Header projectName={projectName} />
    {children()}
    {/* <Footer /> */}
  </React.Fragment>
);

export default IndexLayout;
