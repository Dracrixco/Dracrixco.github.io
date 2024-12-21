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
import { movesData, pokemonData, objectsData } from "@/data/pageData";
import { objectsDataType } from "../data/dataTypes";
import { pokemonDataType, movesDataType } from "../data/dataTypes";
import PokemonCard from "./pokemon-card";

const SelectPokemon = () => {
  const { pokemons, addPokemon, removePokemon } = useContext(PokemonContext)!;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<pokemonDataType[]>(
    [] as pokemonDataType[]
  );
  const [selectedPokemon, setSelectedPokemon] = useState<
    (typeof pokemonData)[0] | null
  >(null);
  const [selectedMoves, setSelectedMoves] = useState<movesDataType[]>(
    [] as movesDataType[]
  );
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
      setFilteredPokemons([]);
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
        moves: selectedMoves,
        object: selectedObject,
      });
      setIsOpen(false);
      setSearchTerm("");
      setFilteredPokemons([]);
      setSelectedPokemon(null);
      setSelectedMoves([]);
      setSelectedObject(null);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Agregar Pokémon</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogTitle>Selecciona un Pokémon</DialogTitle>
          <DialogDescription>
            Usa el siguiente campo para buscar y seleccionar un Pokémon. Luego,
            asigna movimientos y un objeto.
          </DialogDescription>
          <Input
            name="pokemon-search"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Buscar Pokémon"
          />
          <div className="max-h-60 overflow-y-auto mt-4 space-y-2">
            {filteredPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.internalName}
                id={pokemon.internalName}
                name={pokemon.name}
                onSelect={handleSelectPokemon}
              />
            ))}
          </div>
          {selectedPokemon && (
            <div className="mt-4">
              <h3 className="text-md font-semibold">Asignar Movimientos</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {movesData.map((move) => (
                  <Button
                    key={move.internalName}
                    variant={
                      selectedMoves.includes(move) ? "secondary" : "outline"
                    }
                    onClick={() => {
                      if (selectedMoves.includes(move)) {
                        setSelectedMoves(
                          selectedMoves.filter(
                            (m) => m.internalName !== move.internalName
                          )
                        );
                      } else {
                        setSelectedMoves([...selectedMoves, move]);
                      }
                    }}
                  >
                    {move.name}
                  </Button>
                ))}
              </div>
              <h3 className="text-md font-semibold mt-4">Asignar Objeto</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {objectsData.map((obj) => (
                  <Button
                    key={obj.internalName}
                    variant={
                      selectedObject?.internalName === obj.internalName
                        ? "secondary"
                        : "outline"
                    }
                    onClick={() => setSelectedObject(obj)}
                  >
                    {obj.name}
                  </Button>
                ))}
              </div>
              <Button className="mt-4" onClick={handleAddPokemon}>
                Confirmar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Equipo de Pokémon</h3>
        <div className="flex flex-wrap gap-4 mt-2">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id} className="border p-2 rounded-lg w-60">
              <img
                src={`src/images/Pokemons/${pokemon.id}.png`}
                alt={pokemon.name}
                className="w-20 h-20 object-cover mx-auto"
              />
              <p className="text-center font-semibold">{pokemon.name}</p>
              <div className="mt-2">
                <p className="text-sm">Movimientos:</p>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectPokemon;
