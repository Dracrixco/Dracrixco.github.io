import { Pokemon, PokemonContext } from "@/pokemon-context";
import { useContext } from "react";
import { Button } from "./ui/button";
import SelectMove from "./select-move";
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
    <div className="flex flex-col gap-4 mt-2 w-full border rounded-lg">
      <img
        src={`src/images/Front/${pokemon.id}.png`}
        alt={pokemon.name}
        className="w-20 h-20 object-cover mx-auto"
      />
      <p className="text-center font-semibold">{pokemon.name}</p>
      <div className="mt-2">
        <SelectMove
          moves={PokemonSpeciesData.moves}
          eggMoves={PokemonSpeciesData.egg_moves}
          tutorMoves={PokemonSpeciesData.tutor_moves}
        />
        <ul className="list-disc list-inside">
          {pokemon.moves.map((move) => (
            <li key={move.internalName}>{move.name}</li>
          ))}
        </ul>
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
