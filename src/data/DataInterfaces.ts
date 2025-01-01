import { PokemonType } from "@/utils/get-type-color";

export interface movesDataType {
  internalName: string;
  name: string;
  type: PokemonType;
  power: number;
  accuracy: number;
  new: boolean;
  category: string;
  description: string;
  PasiveDescription?: string;
}

export interface pokemonDataType {
  internalName: string;
  name: string;
  Color: string;
  generation: string;
  types: string[];
  moves: string[];
  tutor_moves: string[];
  flags: string[];
  egg_moves: string[];
  abilities: string[];
  baseStats: {
    HP: number;
    ATTACK: number;
    DEFENSE: number;
    SPECIAL_ATTACK: number;
    SPECIAL_DEFENSE: number;
    SPEED: number;
  };
}

export interface trainersDataType {
  internalName: string;
  name: string;
}

export interface itemDataType {
  internalName: string;
  name: string;
  description: string;
  pocket: number;
}

export interface typeData {
  internalName: string;
  name: string;
}

export interface pokeballsDataType {
  internalName: string;
  name: string;
}

export interface abilityDataType {
  internalName: string;
  name: string;
  description: string;
}
