import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Pokemon, PokemonContext } from "@/pokemon-context";
import { pokemonDataType, abilityDataType } from "@/data/DataInterfaces";
import AbilityData from "@/data/DataAbility.json";

interface SelectAbilityProps {
  pokemon: Pokemon;
  PokemonSpeciesData: pokemonDataType;
}

interface EnhancedAbility {
  indexInSpecies: number; // Índice real en el array PokemonSpeciesData.abilities
  info: abilityDataType; // Datos completos (nombre, descripción, etc.)
}

export const SelectAbility: React.FC<SelectAbilityProps> = ({
  pokemon,
  PokemonSpeciesData,
}) => {
  const { updatePokemon, difficultType } = useContext(PokemonContext)!;
  const [isOpen, setIsOpen] = useState(false);

  // Mantenemos el índice seleccionado dentro del array "PokemonSpeciesData.abilities"
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    pokemon.abilityIndex?.[difficultType] ?? null
  );

  // Lista completa de habilidades que tiene este Pokémon (sus índices y datos)
  const [availableAbilities, setAvailableAbilities] = useState<
    EnhancedAbility[]
  >([]);
  // Campo para filtrar por nombre de habilidad
  const [searchTerm, setSearchTerm] = useState("");

  // Al montar, construimos un array con datos (nombre, descripción) para cada habilidad del Pokémon
  useEffect(() => {
    const result: EnhancedAbility[] = [];
    PokemonSpeciesData.abilities.forEach((internalName, idx) => {
      const abData = AbilityData.find((ab) => ab.internalName === internalName);
      if (abData) {
        result.push({ indexInSpecies: idx, info: abData });
      }
    });
    setAvailableAbilities(result);
  }, [PokemonSpeciesData]);

  // Filtrado por texto en "searchTerm"
  const filteredAbilities = availableAbilities.filter((enhAb) =>
    enhAb.info.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      // Si está en default, aplicamos el mismo índice a todas las dificultades
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

  // Indice actual, convertimos a nombre si es válido
  const currentIndex = pokemon.abilityIndex?.[difficultType] ?? -1;
  let currentAbilityName = "None";
  let currentAbilityDesc = "";
  if (currentIndex >= 0 && currentIndex < PokemonSpeciesData.abilities.length) {
    const abilityInternal = PokemonSpeciesData.abilities[currentIndex];
    const abData = AbilityData.find(
      (ab) => ab.internalName === abilityInternal
    );
    if (abData) {
      currentAbilityName = abData.name;
      currentAbilityDesc = abData.description;
    }
  }

  return (
    <div className="w-full bg-gray-300 p-2">
      <p className="font-semibold mb-1">Habilidad actual:</p>
      <p>
        <strong>{currentAbilityName}</strong>
      </p>
      {currentAbilityDesc && (
        <p className="text-sm text-gray-600">{currentAbilityDesc}</p>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Seleccionar Habilidad</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Selecciona una Habilidad</DialogTitle>
          <DialogDescription>
            Elige la habilidad del Pokémon (filtro por nombre).
          </DialogDescription>

          <Input
            placeholder="Buscar Habilidad"
            className="mt-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="mt-4 max-h-64 overflow-y-auto border rounded p-2">
            {filteredAbilities.length === 0 && (
              <p className="text-gray-500">No se encontraron habilidades.</p>
            )}
            {filteredAbilities.map((enhAb) => {
              const { indexInSpecies, info } = enhAb;
              const isSelected = selectedIndex === indexInSpecies;
              return (
                <div
                  key={info.internalName}
                  className={`p-2 cursor-pointer border-b ${
                    isSelected ? "bg-blue-50" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedIndex(indexInSpecies)}
                >
                  <p className="font-medium">{info.name}</p>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </div>
              );
            })}
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
