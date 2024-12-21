import "./App.css";
import SelectTrainerType from "./components/select-trainer";
import { SectionSeparator } from "./components/section-separator";
import { PokemonProvider } from "./pokemon-context";
import SelectPokemon from "./components/select-pokemon";

function App() {
  return (
    <PokemonProvider>
      <div>
        <h1 className="w-full bg-black text-white text-center py-4">
          Trainer Generator
        </h1>
        <SectionSeparator>
          <h2 className="text-lg font-semibold mb-2">Trainer Section</h2>
          <SelectTrainerType />
        </SectionSeparator>
        <SectionSeparator>
          <h2 className="text-lg font-semibold mb-2">Pokemon Team Section</h2>
          <SelectPokemon />
        </SectionSeparator>
      </div>
    </PokemonProvider>
  );
}

export default App;
