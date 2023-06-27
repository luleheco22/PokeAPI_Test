import React, { useState, useEffect, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Pokemon } from "../interfaces/index";
import axios from "axios";

interface PokemonContextData {
    pokemonList: Pokemon[];
    error: string;
    loading: boolean;
    nextPageUrl: string;
    previousPageUrl: string;
    pokemon: Pokemon | null;
    startIndex: number;
    setPokemonList: React.Dispatch<React.SetStateAction<Pokemon[]>>;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
    getPokemon: (id: string | number) => void;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

const PokemonContext = createContext<PokemonContextData>({} as PokemonContextData);

interface PokemonProviderProps {
    children: ReactNode;
}
const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [nextPageUrl, setNextPageUrl] = useState<string>("");
    const [previousPageUrl, setPreviousPageUrl] = useState<string>("");
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [startIndex, setStartIndex] = useState<number>(1);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        setLoading(true);

        try {
            const fetchPokemons = async () => {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species?limit=0`);
                const pokemonDetails = await Promise.all(
                    response.data.results.map(async (pokemon: Pokemon, index: number) => {
                        const pokemonRecord = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                        return {
                            ...pokemonRecord.data,
                            startIndex: startIndex + index
                        };
                    })
                );
                setPokemonList(pokemonDetails);
                setNextPageUrl(response.data.next);
                setCount(response.data.count);
                if (response.status !== 200 && response) {
                    setError('Ha ocurrido algo mal');
                }
                setLoading(false);
            };
            fetchPokemons();

        } catch (err) {
            console.log(err, 'esto')
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchNextPage = async () => {
        try {
          const response = await axios.get(nextPageUrl);
          const pokemonDetails = await Promise.all(
            response.data.results.map(async (pokemon: Pokemon, index: number) => {
              const pokemonRecord = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
              return {
                ...pokemonRecord.data,
                startIndex: startIndex + index
              };
            })
          );
          if (response.data.previous) {
              setPreviousPageUrl(response.data.previous);
          }
          setPokemonList(pokemonDetails);
          setNextPageUrl(response.data.next);
          setStartIndex(startIndex + 10);
        } catch (error) {
          console.log("Error fetching next Pokémon page:", error);
        }
      };

      const fetchPreviousPage = async () => {
        try {
            console.log(previousPageUrl, 'esto')
          const response = await axios.get(previousPageUrl);
          const pokemonDetails = await Promise.all(
            response.data.results.map(async (pokemon: Pokemon, index: number) => {
              const pokemonRecord = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
              return {
                ...pokemonRecord.data,
                startIndex: startIndex - index
              };
            })
          );
          setPokemonList(pokemonDetails);
          setNextPageUrl(response.data.next);
          setPreviousPageUrl(response.data.previous);
          setStartIndex(startIndex - 10);
        } catch (error) {
          console.log("Error fetching previous Pokémon page:", error);
        }
      };

    const getPokemon = async (id: string) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(response.data);
        } catch (error) {
            console.log("Error fetching Pokémon:", error);
        }
    };


    return (
        <PokemonContext.Provider value={{
            pokemonList,
            error,
            loading,
            nextPageUrl,
            previousPageUrl,
            fetchNextPage,
            fetchPreviousPage,
            getPokemon,
            pokemon,
            startIndex,
            count,
            setPokemonList
        }}>
            {children}
        </PokemonContext.Provider>
    )
}

export { PokemonProvider }

export default PokemonContext;