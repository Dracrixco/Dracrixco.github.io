import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PokemonContext } from "@/pokemon-context";
import { pokemonData } from "@/data/pageData";
import { itemDataType, pokemonDataType } from "../data/dataTypes";
import PokemonCard from "./pokemon-card";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface SelectPokemonProps {
  children?: React.ReactNode;
}

// Lista de tipos disponibles
const allPokemonTypes = [
  "Normal",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

const SelectPokemon = ({ children }: SelectPokemonProps) => {
  const { addPokemon } = useContext(PokemonContext)!;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [filteredPokemons, setFilteredPokemons] = useState<pokemonDataType[]>(
    []
  );
  const [selectedPokemon, setSelectedPokemon] = useState<
    (typeof pokemonData)[0] | null
  >(null);
  const [selectedObject, setSelectedObject] = useState<itemDataType | null>(
    null
  );

  useEffect(() => {
    setFilteredPokemons(pokemonData);
  }, []);

  const handleNameFilter = (nameFilter: string, typeFilter: string) => {
    if (!nameFilter && !typeFilter) {
      setFilteredPokemons(pokemonData);
      return;
    }
    const lowerName = nameFilter.toLowerCase();
    const data = pokemonData.filter((p) => {
      const nameMatch = !lowerName || p.name.toLowerCase().includes(lowerName);
      const typeMatch =
        !typeFilter ||
        p.types.some((t) => t.toLowerCase() === typeFilter.toLowerCase());
      return nameMatch && typeMatch;
    });
    setFilteredPokemons(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleNameFilter(value, selectedType);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedType(value);
    handleNameFilter(searchTerm, value);
  };

  const handleSelectPokemon = (id: string) => {
    const pokemon = pokemonData.find((p) => p.internalName === id);
    if (pokemon) {
      setSelectedPokemon(pokemon);
    }
  };

  const handleAddPokemon = () => {
    if (selectedPokemon) {
      addPokemon({
        id: selectedPokemon.internalName,
        name: selectedPokemon.name,
        object: selectedObject,
        moves: {
          default: [],
          easy: [],
          normal: [],
          hard: [],
          absolution: [],
        },
        item: {},
        abilityIndex: {},
        pokeball: { internalName: "POKEBALL", name: "Poké Ball" },
      });
      setIsOpen(false);
      setSearchTerm("");
      setSelectedType("");
      setFilteredPokemons([]);
      setSelectedPokemon(null);
      setSelectedObject(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="md:min-w-max">
        <DialogTitle>Selecciona un Pokémon</DialogTitle>
        <DialogDescription>
          Usa el siguiente campo para buscar por nombre o filtrar por tipo.
        </DialogDescription>
        <div className="flex gap-2 mt-2">
          <Input
            name="pokemon-search"
            value={selectedPokemon ? selectedPokemon.name : searchTerm}
            onClick={() => {
              setSelectedPokemon(null);
              setSearchTerm("");
            }}
            onChange={handleInputChange}
            placeholder="Buscar Pokémon"
          />
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="border border-gray-300 rounded p-1"
          >
            <option value="">Todos los tipos</option>
            {allPokemonTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {(!selectedPokemon || selectedPokemon === null) && (
          <div
            className={cn([
              "max-h-96 overflow-y-auto mt-4",
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2",
            ])}
          >
            {filteredPokemons.map((pokemon) => (
              <PokemonCard
                types={pokemon.types}
                key={pokemon.internalName}
                id={pokemon.internalName}
                name={pokemon.name}
                onSelect={handleSelectPokemon}
              />
            ))}
          </div>
        )}
        {selectedPokemon && (
          <Button className="mt-4" onClick={handleAddPokemon}>
            Confirmar
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SelectPokemon;
