import React, { createContext, useState, ReactNode } from "react";
import {
  movesDataType,
  objectsDataType,
  trainersDataType,
} from "./data/dataTypes";

export interface Pokemon {
  id: string;
  name: string;
  moves: movesDataType[];
  object: objectsDataType | null;
}

interface PokemonContextType {
  selectedTrainer: trainersDataType | null;
  setSelectedTrainer: (trainer: trainersDataType | null) => void;
  pokemons: Pokemon[];
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemonId: string) => void;
  updatePokemon: (updatedPokemon: Pokemon) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);

interface PokemonProviderProps {
  children: ReactNode;
  pokemons: Pokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
  pokemons,
  setPokemons,
}) => {
  const [selectedTrainer, setSelectedTrainer] =
    useState<trainersDataType | null>(null);

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
