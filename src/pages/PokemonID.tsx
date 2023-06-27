import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePokemon from '../hooks/usePokemon';
import tw from 'twin.macro';

const Container = tw.div`
w-full
`

const ContainerForm = tw.div`
p-4 md:pt-8 flex flex-col md:flex-row 
items-center content-center max-w-6xl mx-auto md:space-x-5
`

const Title = tw.h2`
text-lg mb-3 font-bold
`
const Text = tw.p`
text-lg mb-3
`

const PokemonID: React.FC = () => {
  const { loading, pokemon, getPokemon } = usePokemon();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      getPokemon(id);
    }
  }, [getPokemon, id]);

  return (
    <>
      {loading && <p>Loading...</p>}
      <Container className='w-full'>
        <ContainerForm>
          <img
           src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt={`image ${pokemon?.name}`}
            placeholder='blur'
            // blurDataURL='/spinner.svg'
          />

          <div className='p-2'>
          <Title>
            {pokemon?.name}
          </Title>
          <Text>
          <span className='font-semibold mr-1'>Height: </span>{pokemon?.height}
          </Text>
          <Text>
           <span className='font-semibold mr-1'>Weight </span> {pokemon?.weight}
          </Text>
          <Text>
            Types: {pokemon?.types.map((type) => type.type.name).join(', ')}
            </Text>
            <Text>
                Abilities: {pokemon?.abilities.map((ability) => ability.ability.name).join(', ')}
            </Text>
            <Text>
                Stats: {pokemon?.stats.map((stat) => stat.stat.name).join(', ')}
            </Text>
            <Text>
               Moves: {pokemon?.moves.map((move) => move.move.name).join(', ')}
            </Text>
            <Text>
           <span className='font-semibold mr-1'>Abilities: </span> {pokemon?.abilities.map((ability) => ability.ability.name).join(', ')}
          </Text>

          </div>

        </ContainerForm>

      </Container>
    </>
  );
};

export default PokemonID;