import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { movesData } from "@/data/pageData";
import { movesDataType, pokemonDataType } from "@/data/dataTypes";
import { Pokemon, PokemonContext } from "@/pokemon-context";

interface SelectMovesProps {
  pokemon: Pokemon;
  PokemonSpeciesData: pokemonDataType;
}

interface ReadyMove extends movesDataType {
  category: "Movimiento" | "Movimientos de Tutor" | "Movimientos de Huevo";
}

// Para filtrar por tipo y categoría (ejemplo)
const allTypes = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
];
const allCategories = [
  "Movimiento",
  "Movimientos de Tutor",
  "Movimientos de Huevo",
];

export const SelectMoves: React.FC<SelectMovesProps> = ({
  pokemon,
  PokemonSpeciesData,
}) => {
  const { updatePokemon, difficultType } = useContext(PokemonContext)!;
  const [readyMoves, setReadyMoves] = useState<ReadyMove[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // Nuevos estados para filtrar por tipo, categoría y poder mínimo.
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [minPower, setMinPower] = useState("");

  const [filteredMoves, setFilteredMoves] = useState<ReadyMove[]>([]);
  const [selectedMoves, setSelectedMoves] = useState<ReadyMove[]>([]);

  useEffect(() => {
    const {
      moves,
      tutor_moves: tutorMoves,
      egg_moves: eggMoves,
    } = PokemonSpeciesData;

    const mapMoves = (
      internalNames: string[],
      category: ReadyMove["category"]
    ): ReadyMove[] => {
      return internalNames
        .map((internalName) => {
          const move = movesData.find((m) => m.internalName === internalName);
          return move ? { ...move, category } : null;
        })
        .filter((move): move is ReadyMove => move !== null);
    };

    let combinedMoves = mapMoves(moves, "Movimiento");
    if (tutorMoves) {
      combinedMoves = [
        ...combinedMoves,
        ...mapMoves(tutorMoves, "Movimientos de Tutor"),
      ];
    }
    if (eggMoves) {
      combinedMoves = [
        ...combinedMoves,
        ...mapMoves(eggMoves, "Movimientos de Huevo"),
      ];
    }

    // Eliminar duplicados
    const uniqueMoves: { [key: string]: ReadyMove } = {};
    combinedMoves.forEach((move) => {
      if (!uniqueMoves[move.internalName]) {
        uniqueMoves[move.internalName] = move;
      }
    });

    setReadyMoves(Object.values(uniqueMoves));
    setSelectedMoves([]);
  }, [PokemonSpeciesData]);

  // Carga movimientos para la dificultad actual
  useEffect(() => {
    const mappedMoves = pokemon.moves[difficultType]?.map((move) => ({
      ...move,
      category: move.category as
        | "Movimiento"
        | "Movimientos de Tutor"
        | "Movimientos de Huevo",
    }));
    setSelectedMoves(mappedMoves || []);
  }, [difficultType, pokemon.moves]);

  // Aplica filtros de búsqueda, tipo, categoría y poder mínimo
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = readyMoves.filter((move) => {
      const { name, type, category, power } = move;
      const matchesSearch =
        name.toLowerCase().includes(lowerSearch) ||
        type.toLowerCase().includes(lowerSearch) ||
        category.toLowerCase().includes(lowerSearch);
      const matchesType = !filterType || type === filterType;
      const matchesCategory = !filterCategory || category === filterCategory;
      const matchesMinPower = !minPower || power >= parseInt(minPower);
      return matchesSearch && matchesType && matchesCategory && matchesMinPower;
    });
    setFilteredMoves(filtered);
  }, [searchTerm, filterType, filterCategory, minPower, readyMoves]);

  // Selección/deselección de movimientos con límite de 4
  const toggleMoveSelection = (move: ReadyMove) => {
    const isSelected = selectedMoves.some(
      (m) => m.internalName === move.internalName
    );
    if (isSelected) {
      setSelectedMoves(
        selectedMoves.filter((m) => m.internalName !== move.internalName)
      );
    } else if (selectedMoves.length < 4) {
      setSelectedMoves([...selectedMoves, move]);
    }
  };

  const handleConfirm = () => {
    const updatedPokemon: Pokemon = {
      ...pokemon,
      moves: { ...pokemon.moves, [difficultType]: selectedMoves },
    };

    if (difficultType === "default") {
      updatedPokemon.moves = {
        ...updatedPokemon.moves,
        easy: selectedMoves,
        normal: selectedMoves,
        hard: selectedMoves,
        absolution: selectedMoves,
      };
    }
    updatePokemon(updatedPokemon);
    setIsOpen(false);
  };

  return (
    <div className="w-full bg-gray-100 p-2">
      <h3 className="text-lg font-semibold">Movimientos Seleccionados</h3>
      {selectedMoves.length === 0 ? (
        <p className="text-gray-500">No hay movimientos seleccionados.</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {selectedMoves.map((move) => (
            <p key={move.internalName}>{move.name}</p>
          ))}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="mt-2 w-full">Editar Movimientos</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogTitle>Selecciona Movimientos</DialogTitle>
          <DialogDescription>
            Filtra por nombre, tipo, categoría o poder. Selecciona hasta 4.
          </DialogDescription>

          {/* Filtro por nombre */}
          <Input
            name="move-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar Movimiento"
            className="mt-4"
          />

          {/* Filtro por tipo */}
          <div className="mt-2 flex items-center gap-2">
            <label className="text-sm">Tipo:</label>
            <select
              className="border p-1 rounded"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Todos</option>
              {allTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* Filtro por categoría */}
            <label className="ml-4 text-sm">Categoría:</label>
            <select
              className="border p-1 rounded"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Todas</option>
              {allCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* Filtro por poder mínimo */}
            <label className="ml-4 text-sm">Poder mínimo:</label>
            <Input
              type="number"
              min={0}
              className="w-16"
              value={minPower}
              onChange={(e) => setMinPower(e.target.value)}
            />
          </div>

          {selectedMoves.length >= 4 && (
            <p className="text-red-500 mt-2">
              Solo puedes seleccionar hasta 4 movimientos.
            </p>
          )}

          {/* Lista de movimientos filtrados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 max-h-80 overflow-y-auto">
            {filteredMoves.map((move) => {
              const isSelected = selectedMoves.some(
                (m) => m.internalName === move.internalName
              );
              const isLimitReached = selectedMoves.length >= 4 && !isSelected;
              return (
                <div
                  key={move.internalName}
                  className={`border rounded-lg p-4 shadow cursor-pointer ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:bg-gray-100"
                  } ${isLimitReached ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !isLimitReached && toggleMoveSelection(move)}
                >
                  <h4 className="text-lg font-semibold">{move.name}</h4>
                  <p className="text-sm text-gray-600">Tipo: {move.type}</p>
                  <p className="text-sm text-gray-600">
                    Potencia: {move.power}
                  </p>
                  <p className="text-sm text-gray-600">
                    Precisión: {move.accuracy}
                  </p>
                  <p className="text-sm text-gray-600">
                    Categoría: {move.category}
                  </p>
                  {isSelected && (
                    <span className="text-blue-500 mt-2 block">
                      Seleccionado
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <Button
            className="mt-4"
            onClick={handleConfirm}
            disabled={selectedMoves.length === 0}
          >
            Confirmar
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
