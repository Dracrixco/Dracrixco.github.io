import "./App.css";
import SelectTrainerType from "./components/select-trainer";
import { SectionSeparator } from "./components/section-separator";
import { PokemonProvider } from "./pokemon-context";
import { Pokemon } from "./pokemon-context";
import SelectPokemon from "./components/select-pokemon";
import { useState } from "react";
import { Button } from "./components/ui/button";
import ReadyPokemonCard from "./components/ready-pokemon-card";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  return (
    <PokemonProvider pokemons={pokemons} setPokemons={setPokemons}>
      <div>
        <h1 className="w-full bg-black text-white text-center py-4">
          Trainer Generator
        </h1>
        <SectionSeparator>
          <h2 className="text-lg font-semibold mb-2">Trainer Section</h2>
          <SelectTrainerType />
        </SectionSeparator>
        <SectionSeparator className="grid grid-cols-6 gap-2 items-center">
          <h2 className="text-lg font-semibold mb-2 col-span-full">
            Pokemon Team Section
          </h2>
          {pokemons.map((pokemon) => (
            <ReadyPokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
          <SelectPokemon>
            <Button className="h-full">Select a Pokemon</Button>
          </SelectPokemon>
        </SectionSeparator>
      </div>
    </PokemonProvider>
  );
}

export default App;
