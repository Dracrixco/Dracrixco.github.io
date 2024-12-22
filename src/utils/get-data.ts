import { pokemonDataType } from "@/data/DataInterfaces";
import pokemonData from "@/data/DataPokemon.json";

export const getPokemonByInternalName = (
  internalName: string
): pokemonDataType | undefined => {
  return pokemonData.find((pokemon) => pokemon.internalName === internalName);
};
