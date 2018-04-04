import * as React from 'react';

export const MenuListItem: React.SFC = ({ children, ...props }) => (
  <li {...props}>{children}</li>
);
