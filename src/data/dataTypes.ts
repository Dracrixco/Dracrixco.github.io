export interface movesDataType {
  name: string;
  type: string;
  power: string;
  accuracy: string;
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
  id: string;
  name: string;
}
