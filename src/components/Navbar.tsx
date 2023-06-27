import React from 'react'
import NavbarItem from './NavbarItem'
import tw from 'twin.macro'


const Container = tw.div`
flex 
justify-center 
bg-orange-600 
lg:text-lg 
p-4
`


const Navbar:React.FC = () => {
  return (
    <Container>
      <NavbarItem title='Pokedex MONOMA' />
    </Container>
  )
}

export default Navbar