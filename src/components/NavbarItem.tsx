import React from 'react';
import tw from 'twin.macro';

interface NavbarItemProps {
  title: string;
}

const Title = tw.p`
    text-white
    text-lg
    font-semibold

`



const NavbarItem: React.FC<NavbarItemProps> = ({ title }) => {

  return (
    <Title>
        {title}
    </Title>
  );
};

export default NavbarItem;