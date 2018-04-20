import * as React from 'react';
import { Menu, MenuList, MenuListItem, MenuListItemLink } from '.';

export interface SidebarChildren {
  title: string;
  path: string;
}

interface Props {
  items: SidebarChildren[];
}

export const Sidebar: React.SFC<Props> = ({ items }) => (
  <div className="lg:w-1/6 px-4">
    <Menu>
      <MenuList>
        {items.map((item, index) => (
          <MenuListItem key={index}>
            <MenuListItemLink to={item.path}>{item.title}</MenuListItemLink>
          </MenuListItem>
        ))}
      </MenuList>
    </Menu>
  </div>
);
