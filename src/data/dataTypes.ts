export interface movesDataType {
  internalName: string;
  name: string;
  type: string;
  power: number;
  accuracy: number;
  new: boolean;
  category: string;
}

export interface pokemonDataType {
  internalName: string;
  name: string;
  types: string[];
  moves: string[];
  tutor_moves: string[];
  egg_moves: string[];
  abilities: string[];
}

export interface trainersDataType {
  internalName: string;
  name: string;
}

export interface itemDataType {
  internalName: string;
  name: string;
  pocket: number;
}

export interface typeData {
  internalName: string;
  name: string;
}

export interface abilityData {
  internalName: string;
  name: string;
  description: string;
}
