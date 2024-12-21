import React, { createContext, useState, ReactNode } from "react";
import { movesDataType, objectsDataType } from "./data/dataTypes";

interface Trainer {
  id: string;
  name: string;
}

interface Pokemon {
  id: string;
  name: string;
  moves: movesDataType[];
  object: objectsDataType | null;
}

interface PokemonContextType {
  selectedTrainer: Trainer | null;
  setSelectedTrainer: (trainer: Trainer | null) => void;
  pokemons: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemonId: string) => void;
  updatePokemon: (updatedPokemon: Pokemon) => void;
}

export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
}) => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const addPokemon = (pokemon: Pokemon) => {
    setPokemons((prev) => [...prev, pokemon]);
  };

  const removePokemon = (pokemonId: string) => {
    setPokemons((prev) => prev.filter((pokemon) => pokemon.id !== pokemonId));
  };

  const updatePokemon = (updatedPokemon: Pokemon) => {
    setPokemons((prev) =>
      prev.map((pokemon) =>
        pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon
      )
    );
  };

  return (
    <PokemonContext.Provider
      value={{
        selectedTrainer,
        setSelectedTrainer,
        pokemons,
        addPokemon,
        removePokemon,
        updatePokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
