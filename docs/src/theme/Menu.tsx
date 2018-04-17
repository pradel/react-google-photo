import * as React from 'react';

export const Menu: React.SFC = ({ ...props }) => (
  <div className="" {...props} />
);

export const MenuLabel: React.SFC = ({ ...props }) => (
  <p className="menu-label" {...props} />
);

export const MenuList: React.SFC = ({ ...props }) => (
  <ul className="menu-list" {...props} />
);

export const MenuListItem: React.SFC = ({ ...props }) => (
  <li className="mb-3" {...props} />
);

interface MenuListItemAProps {
  href: string;
}

export const MenuListItemA: React.SFC<MenuListItemAProps> = ({ ...props }) => (
  <a className="text-grey-darker hover:text-teal" {...props} />
);
