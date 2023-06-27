import { Outlet } from 'react-router-dom'
import tw from 'twin.macro'
import useAuth from '../hooks/useAuth'
import { PacmanLoader } from "react-spinners";

const ContainerMain = tw.main`
container
mx-auto
mt-5
md:mt-20 
p-5
md:flex
md:justify-center
`
const ContainerForm = tw.div`
md:w-2/3
lg:w-1/3
`

const AuthLayout = () => {
const { loading } = useAuth()

  return (
    <ContainerMain>
        {loading ? (
        <PacmanLoader size={45} color="#d8571b" />
        ) : (
      <ContainerForm>
        <Outlet />
      </ContainerForm>

        )}
    </ContainerMain>
  )
}

export default AuthLayout