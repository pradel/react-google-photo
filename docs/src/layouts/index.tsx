import * as React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import '../styles/style.scss';
import { Footer } from '../components/Footer';

const theme = {
  primary: '#001b44',
  secondary: '#05668D',
  dark: 'rgba(0, 27, 68, 1)',
  dark80: 'rgba(0, 27, 68, 0.8)',
  dark60: 'rgba(0, 27, 68, 0.6)',
};

const IndexLayout: React.SFC = ({ children }: any) => (
  <ThemeProvider theme={theme}>
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
  </ThemeProvider>
);

export default IndexLayout;
