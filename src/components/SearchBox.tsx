import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

const ContainerForm = tw.form`
  flex 
  max-w-6xl 
  mx-auto 
  justify-between 
  items-center 
  px-5
`;
const Input = tw.input`
  w-full 
  h-14 
  rounded-none 
  placeholder-gray-500 
  outline-none
  bg-transparent 
  flex-1
`;
const Button = tw.button`
  text-orange-600 
  disabled:text-gray-400
`;

const SearchBox: React.FC = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;

    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      if (response.ok) {
        const data = await response.json();
        const filteredResults = data.results.filter((result: { name: string }) =>
          result.name.startsWith(search.toLowerCase())
        );
        if (filteredResults.length > 0) {
          const pokemon = filteredResults[0];
          const id = pokemon.url.split('/').reverse()[1];
          navigate(`/pokemons/${id}`);
        } else {
          console.log('Pokemon not found');
        }
      } else {
        console.log('Failed to fetch Pokemon data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContainerForm onSubmit={handleSubmit}>
      <Input
        type="text"
        value={search}
        placeholder="Search keywords..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit" disabled={!search}>
        Search
      </Button>
    </ContainerForm>
  );
};

export default SearchBox;