import * as React from 'react';

export const Content: React.SFC = ({ children }) => (
  <div className="lg:w-5/6 px-4">
    <div className="flex">
      <div className="w-100 markdown-content">{children}</div>
    </div>
  </div>
);
