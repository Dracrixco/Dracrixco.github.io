import { pokemonDataType } from "@/data/dataTypes";
import { pokemonData } from "@/data/pageData";

export const getPokemonByInternalName = (
  internalName: string
): pokemonDataType | undefined => {
  return pokemonData.find((pokemon) => pokemon.internalName === internalName);
};
