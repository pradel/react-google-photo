import * as React from 'react';

export const MenuLabel: React.SFC = ({ children, ...props }) => (
  <p className="menu-label" {...props}>{children}</p>
);
