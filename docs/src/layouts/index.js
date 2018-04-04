import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import '../styles/style.scss';

const IndexLayout = ({ children }) => (
  <React.Fragment>
    <Helmet
      title="react-google-photo"
      meta={[
        { name: 'description', content: 'A react lightbox component' },
        { name: 'keywords', content: 'react, google, photo' },
      ]}
    />
    {children()}
  </React.Fragment>
);

IndexLayout.propTypes = {
  children: PropTypes.func, // eslint-disable-line
};

export default IndexLayout;
