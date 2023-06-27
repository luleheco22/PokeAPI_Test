import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import tw from "twin.macro";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";
import usePokemon from "../hooks/usePokemon";
import { PacmanLoader } from "react-spinners";


const Container = tw.div`
  bg-white
`

const ProtectedRoute = () => {

    const { user  } = useAuth();
    const { loading } = usePokemon();
    const location = useLocation();

  return (
    <>
    {user?.id ? (
        <>
        <Container>
            <Header />
        </Container>
         <Navbar/>
         {location.pathname !== "/pokemons/profile" && <SearchBox />}

         {loading ? (
            <PacmanLoader size={45} color="#d8571b" />
            ) : (
         <Outlet/>
            )}
        </>

    ): <Navigate to='/' />}
    </>
  )
}

export default ProtectedRoute
