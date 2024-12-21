import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Pokemon, PokemonContext } from "@/pokemon-context";
import { pokemonDataType } from "@/data/dataTypes";

// ...existing code (imports, etc.)...

interface SelectAbilityProps {
  pokemon: Pokemon;
  PokemonSpeciesData: pokemonDataType;
}

export const SelectAbility: React.FC<SelectAbilityProps> = ({
  pokemon,
  PokemonSpeciesData,
}) => {
  const { updatePokemon, difficultType } = useContext(PokemonContext)!;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    pokemon.abilityIndex?.[difficultType] ?? null
  );

  const handleConfirm = () => {
    if (selectedIndex !== null && selectedIndex >= 0) {
      const updatedPokemon: Pokemon = {
        ...pokemon,
        abilityIndex: {
          ...pokemon.abilityIndex,
          [difficultType]: selectedIndex,
        },
      };

      if (difficultType === "default") {
        updatedPokemon.abilityIndex = {
          ...updatedPokemon.abilityIndex,
          easy: selectedIndex,
          normal: selectedIndex,
          hard: selectedIndex,
          absolution: selectedIndex,
        };
      }
      updatePokemon(updatedPokemon);
    }
    setIsOpen(false);
  };

  const currentIndex = pokemon.abilityIndex?.[difficultType] ?? -1;
  const currentAbilityName =
    currentIndex >= 0 ? PokemonSpeciesData.abilities[currentIndex] : "None";

  return (
    <div className="w-full">
      <p className="font-semibold">Habilidad actual: {currentAbilityName}</p>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="mt-2">Seleccionar Habilidad</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Selecciona una Habilidad</DialogTitle>
          <DialogDescription>Elige la habilidad del Pokémon.</DialogDescription>
          <div className="mt-4 max-h-64 overflow-y-auto border rounded p-2">
            {PokemonSpeciesData.abilities.map((ability, index) => (
              <div
                key={ability}
                className={`p-2 cursor-pointer border-b ${
                  selectedIndex === index ? "bg-blue-50" : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                {ability}
              </div>
            ))}
          </div>
          <Button
            className="mt-4"
            onClick={handleConfirm}
            disabled={selectedIndex === null}
          >
            Confirmar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
