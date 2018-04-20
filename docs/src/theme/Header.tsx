import * as React from 'react';
import { Github } from '../icons/Github';

// TODO dynamic version number from package.json

interface Props {
  projectName: string;
  version: string;
}

export const Header: React.SFC<Props> = ({ projectName, version }) => (
  <div className="flex bg-white border-b border-solid border-grey-lighter h-16 items-center fixed pin-t pin-x">
    <div className="container mx-auto px-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <a
            href={`https://github.com/pradel/${projectName}/releases`}
            className="text-grey text-lg hover:text-grey-darker"
          >
            {projectName} v{version}
          </a>
        </div>
        <div className="flex items-center">
          <a
            href={`https://github.com/pradel/${projectName}`}
            className="text-dark hover:text-teal"
          >
            <Github />
          </a>
        </div>
      </div>
    </div>
  </div>
);
