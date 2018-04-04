import * as React from 'react';

export const Menu: React.SFC = ({ children, ...props }) => (
  <div className="menu" {...props}>
    {children}
  </div>
);
