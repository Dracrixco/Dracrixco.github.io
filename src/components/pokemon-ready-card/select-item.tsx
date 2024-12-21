import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { itemDataType } from "@/data/dataTypes";
import { itemsData } from "@/data/pageData"; // <-- Asegúrate de tener tus objetos en pageData
import { Pokemon, PokemonContext } from "@/pokemon-context";

interface SelectItemProps {
  pokemon: Pokemon;
}

export const SelectItem: React.FC<SelectItemProps> = ({ pokemon }) => {
  const { updatePokemon, difficultType } = useContext(PokemonContext)!;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<itemDataType[]>(itemsData);
  const [selectedItem, setSelectedItem] = useState<itemDataType | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setSearchTerm(val);
    setFilteredItems(
      itemsData.filter((item) => item.name.toLowerCase().includes(val))
    );
  };

  const handleConfirm = () => {
    if (selectedItem) {
      // Actualiza según tu lógica (ejemplo: un solo item para cada dificultad)
      const updatedPokemon: Pokemon = {
        ...pokemon,
        item: {
          ...pokemon.item,
          [difficultType]: selectedItem,
        },
      };

      if (difficultType === "default") {
        updatedPokemon.item = {
          ...updatedPokemon.item,
          easy: selectedItem,
          normal: selectedItem,
          hard: selectedItem,
          absolution: selectedItem,
        };
      }
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
              src={`/images/Items/${pokemon.item?.[difficultType]?.internalName}.png`}
              alt={pokemon.item?.[difficultType]?.name}
              className="object-cover"
            />
            <p>{pokemon.item?.[difficultType]?.name}</p>
          </div>
        )}
        <p className="font-semibold">Item Seleccionado:</p>
        {pokemon.item?.[difficultType]?.name || "Ninguno"}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Seleccionar Item</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Selecciona un objeto</DialogTitle>
          <DialogDescription>Busca y selecciona un objeto.</DialogDescription>
          <Input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar objeto"
            className="mt-4"
          />
          <div className="mt-4 max-h-64 overflow-y-auto border rounded p-2">
            {filteredItems.map((item) => (
              <div
                key={item.internalName}
                className={`p-2 cursor-pointer border-b flex items-center ${
                  selectedItem?.internalName === item.internalName
                    ? "bg-blue-50"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={`/images/Items/${item.internalName}.png`}
                  alt={item.name}
                  className="object-cover"
                />
                <p>{item.name}</p>
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
