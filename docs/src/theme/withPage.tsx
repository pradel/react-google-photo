import * as React from 'react';
import { Sidebar, Content, Layout } from '.';
import { SidebarChildren } from './Sidebar';

interface Props {
  data: any;
}

export interface Config {
  version: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  sidebar: SidebarChildren[];
}

export const withPage = (config: Config, renderAst: Function) => {
  const Page: React.SFC<Props> = ({ data }) => {
    const page = data.allMarkdownRemark.edges[0].node;
    return (
      <Layout config={config}>
        <div className="container mx-auto pb-8" style={{ marginTop: '8rem' }}>
          <div className="flex flex-col lg:flex-row">
            <Sidebar items={config.sidebar} />
            <Content>{renderAst(page.htmlAst)}</Content>
          </div>
        </div>
      </Layout>
    );
  };
  return Page;
};
