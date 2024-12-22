import "./App.css";
import SelectTrainerType from "./components/select-trainer";
import { SectionSeparator } from "./components/section-separator";
import { PokemonProvider } from "./pokemon-context";
import { Pokemon } from "./pokemon-context";
import SelectPokemon from "./components/select-pokemon";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import ReadyPokemonCard from "./components/pokemon-ready-card/ready-pokemon-card";
import { GenerateTextButton } from "./components/generate-text";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { SelectDifficult } from "./components/select-difficult";
import { typeDifficultyType } from "./pokemon-context";
import { cn } from "./lib/utils";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [trainerName, setTrainerName] = useState<string>("");
  const [trainerLevel, setTrainerLevel] = useState(10);
  const [startText, setStartText] = useState<string>("");
  const [endText, setEndText] = useState<string>("");
  const [difficultType, setDifficultType] =
    useState<typeDifficultyType>("default");

  useEffect(() => {
    // console.log(pokemons);
  }, [pokemons]);

  return (
    <PokemonProvider
      pokemons={pokemons}
      setPokemons={setPokemons}
      trainerName={trainerName}
      setTrainerName={setTrainerName}
      startText={startText}
      setStartText={setStartText}
      endText={endText}
      setEndText={setEndText}
      difficultType={difficultType}
      setDifficultType={setDifficultType}
      trainerLevel={trainerLevel}
      setTrainerLevel={setTrainerLevel}
    >
      <div>
        <div className="flex justify-evenly items-center w-full bg-gray-500 text-white text-center py-4">
          <GenerateTextButton className="fixed top-4 left-4 z-50" />
          <h1>Trainer Generator</h1>
          <SelectDifficult className="fixed top-4 right-4 z-50" />
        </div>
        <SectionSeparator
          className={cn([
            "grid",
            "grid-cols-1",
            "sm:grid-cols-2",
            "md:grid-cols-3",
            "lg:grid-cols-4",
            "space-x-2",
          ])}
        >
          <h2 className="text-lg font-semibold mb-2 w-full col-span-full">
            Trainer Section
          </h2>
          <SelectTrainerType />
          <div
            className={cn(["sm:col-span-1", "md:col-span-2", "lg:col-span-3"])}
          >
            <Label>Trainer Name</Label>
            <Input
              value={trainerName}
              onChange={(e) => {
                setTrainerName(e.target.value);
              }}
            />
            <Label>Trainer Start Text</Label>
            <Input
              value={startText}
              onChange={(e) => {
                setStartText(e.target.value);
              }}
            />
            <Label>Trainer End Text</Label>
            <Input
              value={endText}
              onChange={(e) => {
                setEndText(e.target.value);
              }}
            />
            <Label>Trainer Level: {trainerLevel}</Label>
            <Input
              value={trainerLevel}
              type="range"
              min={1}
              max={100}
              onChange={(e) => {
                setTrainerLevel(parseInt(e.target.value));
              }}
            />
          </div>
        </SectionSeparator>
        <SectionSeparator className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 items-center">
          <h2 className="text-lg font-semibold mb-2 col-span-full">
            Pokemon Team Section
          </h2>
          {pokemons.map((pokemon) => (
            <ReadyPokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
          {pokemons.length < 6 && (
            <SelectPokemon>
              <Button className="h-full">Select a Pokemon</Button>
            </SelectPokemon>
          )}
        </SectionSeparator>
      </div>
    </PokemonProvider>
  );
}

export default App;
