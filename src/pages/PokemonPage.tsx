import React from 'react';
import tw from 'twin.macro';
import usePokemon from "../hooks/usePokemon";
import Results from '../components/Results';

const PokemonPage:React.FC = () => {

  const { loading, pokemonList, error } = usePokemon();
  return (
    <>
      {loading && <p>Loading...</p>}
       <div>
        {error.length ?(
          <p>There was an error</p>
        ):(
          <Results results={pokemonList} />
        )}
       </div>
    </>
  )
}

export default PokemonPage