import React, { createContext, useState, ReactNode } from "react";
import {
  movesDataType,
  itemDataType,
  trainersDataType,
} from "./data/DataInterfaces";
import { pokeballsDataType } from "./data/DataInterfaces";

export interface DificultyMoves {
  default: movesDataType[];
  easy: movesDataType[];
  normal: movesDataType[];
  hard: movesDataType[];
  absolution: movesDataType[];
}

export interface DificultyItem {
  default?: itemDataType;
  easy?: itemDataType;
  normal?: itemDataType;
  hard?: itemDataType;
  absolution?: itemDataType;
}

export interface DificultyAbilityIndex {
  default?: number;
  easy?: number;
  normal?: number;
  hard?: number;
  absolution?: number;
}

export interface Pokemon {
  id: string;
  name: string;
  moves: DificultyMoves;
  item: DificultyItem;
  abilityIndex: DificultyAbilityIndex;
  object: itemDataType | null;
  pokeball: pokeballsDataType | null;
  evs: number[];
  ivs: number[];
  happiness: number;
  isCorrupted?: boolean;
  nature?: string;
}

interface PokemonContextBase {
  trainerName: string;
  setTrainerName: React.Dispatch<React.SetStateAction<string>>;
  startText: string;
  setStartText: React.Dispatch<React.SetStateAction<string>>;
  endText: string;
  setEndText: React.Dispatch<React.SetStateAction<string>>;
  pokemons: Pokemon[];
  difficultType: typeDifficultyType;
  setDifficultType: React.Dispatch<React.SetStateAction<typeDifficultyType>>;
  trainerLevel: number;
  setTrainerLevel: React.Dispatch<React.SetStateAction<number>>;
}

interface PokemonContextType extends PokemonContextBase {
  selectedTrainer: trainersDataType | null;
  setSelectedTrainer: (trainer: trainersDataType | null) => void;
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemonId: string) => void;
  updatePokemon: (updatedPokemon: Pokemon) => void;
}

export type typeDifficultyType =
  | "default"
  | "easy"
  | "normal"
  | "hard"
  | "absolution";
interface PokemonProviderProps extends PokemonContextBase {
  children: ReactNode;
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}
// eslint-disable-next-line react-refresh/only-export-components
export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);

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
  difficultType,
  setDifficultType,
  setTrainerLevel,
  trainerLevel,
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
        setTrainerLevel,
        trainerLevel,
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
        difficultType,
        setDifficultType,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
