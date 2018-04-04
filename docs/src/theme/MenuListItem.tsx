import * as React from 'react';
import styled from 'styled-components';

const StyledMenuListItem = styled.li`
  &:hover a {
    background-color: red;
  }
`;

export const MenuListItem: React.SFC = ({ children, ...props }) => (
  <StyledMenuListItem {...props}>{children}</StyledMenuListItem>
);
