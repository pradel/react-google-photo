import * as React from 'react';
import Link from 'gatsby-link';

export const Menu: React.SFC = ({ ...props }) => (
  <div className="" {...props} />
);

export const MenuLabel: React.SFC = ({ ...props }) => (
  <p className="menu-label" {...props} />
);

export const MenuList: React.SFC = ({ ...props }) => (
  <ul className="list-reset" {...props} />
);

export const MenuListItem: React.SFC = ({ ...props }) => (
  <li className="mb-3" {...props} />
);

interface MenuListItemAProps {
  href: string;
}

export const MenuListItemA: React.SFC<MenuListItemAProps> = ({
  href,
  ...props
}) => (
  <Link className="text-grey-darker hover:text-teal" {...props} to={href} />
);

interface MenuListItemProps {
  to: string;
}

export const MenuListItemLink: React.SFC<MenuListItemProps> = ({
  ...props
}) => <Link className="text-grey-darker hover:text-teal" {...props} />;
