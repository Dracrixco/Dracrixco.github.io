import { Pokemon, PokemonContext } from "@/pokemon-context";
import { useContext } from "react";
import { Button } from "../ui/button";
import { SelectMoves } from "./select-move";
import { getPokemonByInternalName } from "@/utils/get-data";

interface ReadyPokemonCardProps {
  pokemon: Pokemon;
}

const ReadyPokemonCard = ({ pokemon }: ReadyPokemonCardProps) => {
  const { removePokemon } = useContext(PokemonContext)!;
  const PokemonSpeciesData = getPokemonByInternalName(pokemon.id);

  if (!PokemonSpeciesData) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 mt-2 w-full border rounded-lg relative">
      <img
        src={`src/images/Front/${pokemon.id}.png`}
        alt={pokemon.name}
        className="w-[50%] h-auto mx-auto [image-rendering:pixelated]"
      />
      <p className="text-center font-semibold absolute top-2 right-2">
        {pokemon.name}
      </p>
      <div className="mt-2">
        <SelectMoves
          pokemon={pokemon}
          PokemonSpeciesData={PokemonSpeciesData}
        />
      </div>
      <div className="mt-2">
        <p className="text-sm">Objeto:</p>
        <p>{pokemon.object?.name || "Ninguno"}</p>
      </div>
      <Button
        variant="destructive"
        className="mt-2 w-full"
        onClick={() => removePokemon(pokemon.id)}
      >
        Eliminar
      </Button>
    </div>
  );
};

export default ReadyPokemonCard;
