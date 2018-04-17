import * as React from 'react';

// TODO dynamic version number from package.json

interface Props {
  projectName: string;
}

export const Header: React.SFC<Props> = ({ projectName }) => (
  <div className="flex bg-white border-b border-grey-light h-16 items-center">
    <div className="container mx-auto">
      <div className="flex items-center">
        <a
          href={`https://github.com/pradel/${projectName}`}
          className="text-teal text-lg"
        >
          {projectName}
        </a>
        &nbsp;
        <a
          href={`https://github.com/pradel/${projectName}/releases`}
          className="text-grey text-lg"
        >
          v3.0.0
        </a>
      </div>
    </div>
  </div>
);
