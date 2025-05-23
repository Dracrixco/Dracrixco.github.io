import { Pokemon, PokemonContext } from "@/pokemon-context";
import { useContext } from "react";
import { Button } from "../ui/button";
import { SelectMoves } from "./select-move";
import { getPokemonByInternalName } from "@/utils/get-data";
import { SelectItem } from "./select-item";
import { SelectAbility } from "./select-ability";
import { getTypeColor, PokemonType } from "@/utils/get-type-color";
import { cn } from "@/lib/utils";
import { SelectPokeball } from "./select-pokeball";
import { SelectStats } from "./select-stats";
import SetCorruptButton from "./set-corrupt-button";

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
    <div className="flex flex-col gap-4 mt-2 w-full h-full border rounded-lg relative">
      <div className="absolute top-2 left-2">
        {PokemonSpeciesData.types.map((type, idx) => (
          <p
            className={cn([
              "text-sm text-gray-900 rounded-sm border p-2",
              getTypeColor(type as PokemonType),
            ])}
            key={idx}
          >
            {type}
          </p>
        ))}
      </div>

      <img
        src={`./images/Front/${pokemon.id}.png`}
        alt={pokemon.name}
        className="w-[50%] h-auto mx-auto [image-rendering:pixelated]"
      />
      <div className="absolute top-2 right-2 flex items-center">
        <SelectPokeball pokemon={pokemon} />
        <p className="text-center font-semibold">{pokemon.name}</p>
      </div>
      <div className="mt-2">
        <SelectMoves
          pokemon={pokemon}
          PokemonSpeciesData={PokemonSpeciesData}
        />
        <div className="flex flex-col md:flex-row">
          <SelectItem pokemon={pokemon} />
          <SelectAbility
            pokemon={pokemon}
            PokemonSpeciesData={PokemonSpeciesData}
          />
        </div>
        <SelectStats pokemon={pokemon} />
        <SetCorruptButton
          pokemon={pokemon}
          PokemonSpeciesData={PokemonSpeciesData}
        />
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
