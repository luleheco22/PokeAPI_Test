import React, { useState } from 'react'
import tw from 'twin.macro'
import MenuItem from './MenuItem'
import { AiFillHome, AiOutlineUser, AiOutlineMenu, AiOutlineLogout } from 'react-icons/ai'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../assets/icono.jpeg'
import useAuth from '../hooks/useAuth'


const Container = tw.header`
flex 
justify-between 
mx-2 
max-w-6xl 
sm:mx-auto 
items-center py-6
`
const ContainerInner = tw.div`
  flex
`
const IconHome = styled(AiFillHome)`
${tw`
text-2xl 
sm:hidden 
text-orange-600
mx-4`}
`
const IconAccount = styled(AiOutlineUser)`
${tw`
text-2xl 
text-orange-600
sm:hidden 
mx-4`}
`
const ContainerLogo = tw.div`
flex 
items-center 
space-x-5
`

const Title = tw.h2`
text-2xl
`
const ContainerImage = tw.img`
h-28
w-28
`
const DropdownMenu = tw.div`
  absolute
  left-0
  shadow-lg
  rounded-md
  p-2
  mt-16
`;

const MenuItemLogout = tw.div`
  flex
  items-center
  cursor-pointer
  hover:text-orange-600
`;



const Header:React.FC = () => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { signOffAuth } = useAuth();
    const toggleMenu = () => {
        console.log('entroo')
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Container>
            <ContainerInner>
            <AiOutlineMenu
                    className="text-2xl text-orange-600 mx-4 cursor-pointer mt-6 lg:mt-0"
                    onClick={toggleMenu}
                />
                <MenuItem
                    title='HOME'
                    address='/pokemons'
                    Icon={<IconHome />}
                />
                <MenuItem
                    title='ACCOUNT'
                    address='/pokemons/profile'
                    Icon={<IconAccount />}
                />
              
            </ContainerInner>
            {/* Agregar el menú desplegable */}
            {isMenuOpen && (
                <DropdownMenu>
                    {/* Agregar la opción de cierre de sesión */}
                    <MenuItemLogout onClick={signOffAuth}>
                        <AiOutlineLogout className="text-2xl mr-2" />
                        <span>Logout</span>
                    </MenuItemLogout>
                </DropdownMenu>
            )}
            <ContainerLogo>
                <Link to='/pokemons'>
                    <Title>

                        <ContainerImage src={logo} alt="logo" />

                    </Title>
                </Link>
            </ContainerLogo>
        </Container>
    )
}

export default Header