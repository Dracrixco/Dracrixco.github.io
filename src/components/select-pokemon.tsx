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
import { objectsDataType } from "../data/dataTypes";
import { pokemonDataType } from "../data/dataTypes";
import PokemonCard from "./pokemon-card";
import { cn } from "@/lib/utils";

interface SelectPokemonProps {
  children?: React.ReactNode;
}

const SelectPokemon = ({ children }: SelectPokemonProps) => {
  const { addPokemon } = useContext(PokemonContext)!;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<pokemonDataType[]>(
    [] as pokemonDataType[]
  );
  const [selectedPokemon, setSelectedPokemon] = useState<
    (typeof pokemonData)[0] | null
  >(null);
  const [selectedObject, setSelectedObject] = useState<objectsDataType | null>(
    null
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPokemons(filtered);
    } else {
      setFilteredPokemons(pokemonData);
    }
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
      });
      setIsOpen(false);
      setSearchTerm("");
      setFilteredPokemons([]);
      setSelectedPokemon(null);
      setSelectedObject(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-max">
        <DialogTitle>Selecciona un Pokémon</DialogTitle>
        <DialogDescription>
          Usa el siguiente campo para buscar y seleccionar un Pokémon. Luego,
          asigna movimientos y un objeto.
        </DialogDescription>
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
        {!selectedPokemon && (
          <div
            className={cn([
              "max-h-60 overflow-y-auto mt-4 space-y-2",
              "grid grid-cols-3 gap-2",
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
