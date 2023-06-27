import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Login from './pages/Login';
import AuthLayout from './layouts/AuthLayout';
import SignUp from './pages/SignUp';
import ProtectedRoute from './layouts/ProtectedRoute';
import { PokemonProvider } from './context/PokemonProvider';
import PokemonPage from './pages/PokemonPage';
import PokemonID from './pages/PokemonID';
import Profile from './pages/Profile';
const App: React.FC = () => {
  // const H2 = styled.h2`
  //   font-weight: 800;
  //   ${tw`text-base text-indigo-600 tracking-wide uppercase`}
  // `;
 
  return (
    <AuthProvider>
      <PokemonProvider>
      <Routes>
        <Route path="/" element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path="signup" element={<SignUp/>}/>
        </Route>
        <Route path="/pokemons" element={<ProtectedRoute />}>
            <Route index element={<PokemonPage />} />
            <Route path=":id" element={<PokemonID />} />
            <Route path="profile" element={<Profile />} />
          </Route>
      </Routes>
        

      </PokemonProvider>
    </AuthProvider>
  );
}

export default App;