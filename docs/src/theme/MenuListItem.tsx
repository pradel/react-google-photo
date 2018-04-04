import * as React from 'react';
import styled from 'styled-components';

const StyledMenuListItem = styled.li`
  & a {
    color: ${props => props.theme.dark60};
    transition: color 0.1s linear;
  }
  & a:hover {
    background-color: transparent;
    color: ${props => props.theme.dark80};
  }
  & a.is-active {
    background-color: transparent;
    color: ${props => props.theme.dark};
  }
`;

export const MenuListItem: React.SFC = ({ children, ...props }) => (
  <StyledMenuListItem {...props}>{children}</StyledMenuListItem>
);
