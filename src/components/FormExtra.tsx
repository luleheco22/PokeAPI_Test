import React from 'react'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'
import styled from 'styled-components'

const Container = tw.div`
 flex
 justify-center
 items-center
`

const ContainerForm = tw.div`
font-medium 
text-orange-600 
hover:text-orange-500
`
const ContainerLink = styled(Link)`
  color: #ee9b00;
     font-weight: 600;
     &:hover {
         color: #ae2012;
     }
`


const FormExtra:React.FC = () => {
  return (
    <Container>
        <ContainerForm>
          <ContainerLink to={'/reset'}>
             Forgot your password?
          </ContainerLink>
        </ContainerForm>
    </Container>
  )
}

export default FormExtra