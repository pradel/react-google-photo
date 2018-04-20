import * as React from 'react';
import Helmet from 'react-helmet';
import { Header } from '.';
import { Config } from './withPage';

interface Props {
  config: Config;
}

export const Layout: React.SFC<Props> = ({ children, config }) => (
  <React.Fragment>
    <Helmet
      title={config.meta.title}
      meta={[
        { name: 'description', content: config.meta.description },
        { name: 'keywords', content: config.meta.keywords },
      ]}
      htmlAttributes={{
        class: 'bg-white antialiased',
      }}
      bodyAttributes={{
        class: 'text-black',
      }}
    />
    <Header projectName={config.meta.title} version={config.version} />
    {children}
  </React.Fragment>
);
