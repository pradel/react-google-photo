import * as React from 'react';

export const Footer: React.SFC = () => (
  <footer className="footer">
    <div className="container">
      <div className="content">
        <p>
          <strong>react-google-photo</strong> by{' '}
          <a href="https://www.leopradel.com">Léo Pradel</a>
        </p>
      </div>
      <div className="content is-small">
        <p>
          The source code is licensed under{' '}
          <a
            target="_blank"
            href="https://github.com/pradel/react-google-photo/blob/master/LICENSE"
          >
            MIT Licence
          </a>
        </p>
      </div>
    </div>
  </footer>
);
