import * as React from 'react';

export const MenuList: React.SFC = ({ children, ...props }) => (
  <ul className="menu-list" {...props}>{children}</ul>
);
