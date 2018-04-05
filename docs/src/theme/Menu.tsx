import * as React from 'react';

export const Menu: React.SFC = ({ ...props }) => (
  <div className="text-base lg:text-sm" {...props} />
);

export const MenuLabel: React.SFC = ({ ...props }) => (
  <p className="menu-label" {...props} />
);

export const MenuList: React.SFC = ({ ...props }) => (
  <ul className="menu-list" {...props} />
);

export const MenuListItem: React.SFC = ({ ...props }) => (
  <li className="" {...props} />
);

interface MenuListItemAProps {
  href: string;
}

export const MenuListItemA: React.SFC<MenuListItemAProps> = ({ ...props }) => (
  <a
    className="block p-4 text-grey-darker font-bold hover:border-purple hover:bg-grey-lighter border-r-4"
    {...props}
  />
);
