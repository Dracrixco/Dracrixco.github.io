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
  trainerName: string;
  setTrainerName: React.Dispatch<React.SetStateAction<string>>;
  startText: string;
  setStartText: React.Dispatch<React.SetStateAction<string>>;
  endText: string;
  setEndText: React.Dispatch<React.SetStateAction<string>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);

interface PokemonProviderProps {
  children: ReactNode;
  pokemons: Pokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  trainerName: string;
  setTrainerName: React.Dispatch<React.SetStateAction<string>>;
  startText: string;
  setStartText: React.Dispatch<React.SetStateAction<string>>;
  endText: string;
  setEndText: React.Dispatch<React.SetStateAction<string>>;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
  pokemons,
  setPokemons,
  setTrainerName,
  trainerName,
  endText,
  setEndText,
  startText,
  setStartText,
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
        trainerName,
        setTrainerName,
        selectedTrainer,
        setSelectedTrainer,
        pokemons,
        addPokemon,
        removePokemon,
        updatePokemon,
        endText,
        setEndText,
        startText,
        setStartText,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
