import tw from "twin.macro";
import logo from '../assets/icono.jpeg'
import { Link } from "react-router-dom";
import styled from 'styled-components'

interface HeaderProps {
    heading: string;
    paragraph: string;
    linkName: string;
    linkUrl: string;
  }
  const Container = tw.div`
  mb-10
 `

 const ContainerImage = tw.div`
 flex
 justify-center
 `

 const Image = tw.img`
  h-24
  w-24
 `
 const Title = tw.h2`
  text-red-700
  mt-6
  text-center
  text-3xl
  font-extrabold
  text-gray-900
 `
 const Paragraph = tw.p`
  mt-2
  text-center
  text-sm
  text-gray-600     
 `
 const StyledLink = styled(Link)`
     color: #ee9b00;
     font-weight: 600;
     &:hover {
         color: #ae2012;
     }
 `
  
const HeaderForm = ({heading,paragraph,linkName,linkUrl}: HeaderProps) => {


    
  return (
    <Container>
        <ContainerImage>
            <Image src={logo}/>
        </ContainerImage>
        <Title>
            {heading}
        </Title>
        <Paragraph>
            {paragraph} {' '}
            <StyledLink to={linkUrl}>
                {linkName}
            </StyledLink>
        </Paragraph>
    </Container>
  )
}

export default HeaderForm