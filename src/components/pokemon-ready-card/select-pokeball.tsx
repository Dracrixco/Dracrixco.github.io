import React, { useState, useContext, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { pokeballsDataType } from "@/data/dataTypes";
import { pokeballsData } from "@/data/pageData";
import { cn } from "@/lib/utils";
import { Pokemon, PokemonContext } from "@/pokemon-context";

interface SelectPokeballProps {
  pokemon: Pokemon;
}

export const SelectPokeball: React.FC<SelectPokeballProps> = ({ pokemon }) => {
  const { updatePokemon, difficultType } = useContext(PokemonContext)!;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] =
    useState<pokeballsDataType[]>(pokeballsData);
  const [selectedItem, setSelectedItem] = useState<pokeballsDataType | null>(
    null
  );

  useEffect(() => {
    setFilteredItems(
      pokeballsData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      )
    );
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setSearchTerm(val);
  };

  const handleConfirm = () => {
    if (selectedItem) {
      // Actualiza según tu lógica (ejemplo: un solo item para cada dificultad)
      const updatedPokemon: Pokemon = {
        ...pokemon,
        pokeball: selectedItem,
      };

      updatePokemon(updatedPokemon);
    }
    setIsOpen(false);
  };

  return (
    <div className="w-full bg-gray-200 p-2">
      <div className="my-2">
        {pokemon.item?.[difficultType] && (
          <div
            key={pokemon.item?.[difficultType]?.internalName}
            className={`p-2 cursor-pointer border-b flex items-center hover:bg-gray-100`}
          >
            <img
              src={`./images/Items/${pokemon.pokeball?.internalName}.png`}
              alt={pokemon.item?.[difficultType]?.name}
              className="object-cover"
            />
            <p>{pokemon.pokeball?.name}</p>
          </div>
        )}
        <p className="font-semibold">Pokeball Seleccionado:</p>
        {pokemon.pokeball?.name || "Ninguno"}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Seleccionar Item</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Selecciona un objeto</DialogTitle>
          <DialogDescription>Busca y selecciona un objeto.</DialogDescription>
          <div className="flex justify-between">
            <div className="mt-4 w-[70%]">
              <label htmlFor="">Buscar objeto</label>
              <Input
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar objeto"
              />
            </div>
          </div>
          <div className="mt-4 max-h-64 overflow-y-auto border rounded p-2">
            {filteredItems.map((item) => (
              <div
                key={item.internalName}
                className={cn([
                  "p-2 cursor-pointer border-b flex items-center",
                  "relative",
                  selectedItem?.internalName === item.internalName
                    ? "bg-blue-50"
                    : "hover:bg-gray-100",
                ])}
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={`./images/Items/${item.internalName}.png`}
                  alt={item.name}
                  className="object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            className="mt-4"
            onClick={handleConfirm}
            disabled={!selectedItem}
          >
            Confirmar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
