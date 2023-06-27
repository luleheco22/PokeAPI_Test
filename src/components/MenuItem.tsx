import { Link } from "react-router-dom";
import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';


interface MenuItemProps {
    title: string;
    address: string;
    Icon: React.ReactNode;
}

const Text = tw.p`
  hidden 
  sm:inline 
  my-2
  `
const LinkStyled = styled(Link)`
  margin-left: 1rem;
  margin-right: 1rem;
  @media (min-width: 1024px) {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  color: #ee9b00;
     &:hover {
         color: #ae2012;
     }
   
  `
const MenuItem = ({ title, address, Icon }: MenuItemProps) => {
    return (
        <div>
            <LinkStyled to={address}>
                {Icon}
                <Text>
                    {title}
                </Text>

            </LinkStyled>
        </div>
    )
}

export default MenuItem