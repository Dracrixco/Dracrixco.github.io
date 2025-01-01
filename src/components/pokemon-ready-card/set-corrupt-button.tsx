import React, { useContext } from "react";
import { Pokemon, PokemonContext } from "@/pokemon-context";
import { pokemonDataType } from "@/data/DataInterfaces";
import { Button } from "../ui/button";

/**
 * Este botón controla la propiedad booleana "isCorrupted" de un Pokémon.
 * - No se renderiza si la especie no tiene el flag "Corrupted" en sus flags.
 */
interface SetCorruptButtonProps {
  pokemon: Pokemon;
  PokemonSpeciesData: pokemonDataType;
}

const SetCorruptButton = ({
  PokemonSpeciesData,
  pokemon,
}: SetCorruptButtonProps) => {
  const { updatePokemon } = useContext(PokemonContext)!;

  // Si la especie no tiene el flag "Corrupted", no renderizamos nada
  if (!PokemonSpeciesData.flags?.includes("Corrupted")) {
    return null;
  }

  const handleToggleCorrupt = () => {
    const updatedPokemon: Pokemon = {
      ...pokemon,
      isCorrupted: !pokemon.isCorrupted,
    };
    updatePokemon(updatedPokemon);
  };

  return (
    <Button onClick={handleToggleCorrupt} className="w-full mt-2">
      {pokemon.isCorrupted ? "Corrupto: Deshacer" : "Corromper Pokémon"}
    </Button>
  );
};

export default SetCorruptButton;
