import React, { useEffect, useState, useContext } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { movesData } from "@/data";
import { movesDataType, pokemonDataType } from "@/data/DataInterfaces";
import { Pokemon, PokemonContext } from "@/pokemon-context";
import { allTypes } from "@/utils/get-type-color";
import { getTypeColor } from "@/utils/get-type-color";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface SelectMovesProps {
  pokemon: Pokemon;
  PokemonSpeciesData: pokemonDataType;
}

interface ReadyMove extends movesDataType {
  origin: "Movimiento" | "Movimientos de Tutor" | "Movimientos de Huevo";
}

const allOrigins = [
  "Movimiento",
  "Movimientos de Tutor",
  "Movimientos de Huevo",
];

// Physical, Special, Status
const allMoveCategories = ["Physical", "Special", "Status"];

export const SelectMoves: React.FC<SelectMovesProps> = ({
  pokemon,
  PokemonSpeciesData,
}) => {
  const { updatePokemon, difficultType } = useContext(PokemonContext)!;

  const [readyMoves, setReadyMoves] = useState<ReadyMove[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterOrigin, setFilterOrigin] = useState("");
  const [filterMoveCategory, setFilterMoveCategory] = useState("");
  const [minPower, setMinPower] = useState("");
  const [maxPower, setMaxPower] = useState("");
  const [minAccuracy, setMinAccuracy] = useState("");
  const [maxAccuracy, setMaxAccuracy] = useState("");

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
      origin: ReadyMove["origin"]
    ): ReadyMove[] => {
      return internalNames
        .map((internalName) => {
          const move = movesData.find((m) => m.internalName === internalName);
          if (!move) return null;
          // Retornamos un objeto con la `origin` y dejando `category` como su categoría real de combate
          return {
            ...move,
            origin,
          };
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
    const mappedMoves: ReadyMove[] = pokemon.moves[difficultType]?.map(
      (move) => ({
        ...move,
        origin: "Movimiento",
      })
    );
    setSelectedMoves(mappedMoves || []);
  }, [difficultType, pokemon.moves]);

  // Aplica filtros
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = readyMoves.filter((move) => {
      const {
        name,
        type,
        origin,
        category, // "Physical" | "Special" | "Status"
        power,
        accuracy,
      } = move;

      const matchesSearch =
        name.toLowerCase().includes(lowerSearch) ||
        type.toLowerCase().includes(lowerSearch) ||
        origin.toLowerCase().includes(lowerSearch);

      const matchesType = !filterType || type === filterType;
      const matchesOrigin = !filterOrigin || origin === filterOrigin;
      const matchesMoveCategory =
        !filterMoveCategory || category === filterMoveCategory;

      const minPow = minPower ? parseInt(minPower) : 0;
      const maxPow = maxPower ? parseInt(maxPower) : 9999;
      const minAcc = minAccuracy ? parseInt(minAccuracy) : 0;
      const maxAcc = maxAccuracy ? parseInt(maxAccuracy) : 100;

      const withinPower = power >= minPow && power <= maxPow;
      const withinAccuracy = accuracy >= minAcc && accuracy <= maxAcc;

      return (
        matchesSearch &&
        matchesType &&
        matchesOrigin &&
        matchesMoveCategory &&
        withinPower &&
        withinAccuracy
      );
    });
    setFilteredMoves(filtered);
  }, [
    searchTerm,
    filterType,
    filterOrigin,
    filterMoveCategory,
    minPower,
    maxPower,
    minAccuracy,
    maxAccuracy,
    readyMoves,
  ]);

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

  const handleReset = () => {
    setSelectedMoves([]);
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

  const removeMove = (move: ReadyMove) => {
    setSelectedMoves(
      selectedMoves.filter((m) => m.internalName !== move.internalName)
    );
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
        <DialogContent className="max-w-8xl h-full">
          <DialogTitle>Selecciona Movimientos</DialogTitle>
          <DialogDescription>
            Aplica filtros y elige hasta 4 movimientos.
          </DialogDescription>

          <Input
            name="move-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar Movimiento"
            className="mt-0 sm:mt-2 md:mt-4"
          />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-0">
              <AccordionTrigger>Movimientos Seleccionados</AccordionTrigger>
              <AccordionContent>
                <div
                  className={cn([
                    "grid grid-cols-2 xl:grid-cols-4",
                    "gap-2 mt-2 text-black",
                  ])}
                >
                  {selectedMoves.map((move, idx) => (
                    <div
                      key={idx}
                      className={cn([
                        "border rounded p-2 gap-2",
                        "bg-white hover:bg-slate-200",
                        "transition-all flex flex-col",
                        getTypeColor(move.type),
                      ])}
                      onClick={() => removeMove(move)}
                    >
                      <p className="font-bold">{move.name}</p>
                      <p>Categoria: {move.category}</p>
                      <p>Poder: {move.power}</p>
                      <p>Precisión: {move.accuracy}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Filtros de tipo, origen y categoría
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className={cn([
                    "grid grid-cols-2 items-center",
                    "gap-1 sm:gap-2 md:gap-4 mt-0 sm:mt-2 md:mt-4",
                  ])}
                >
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

                  <label className="text-sm">Origen:</label>
                  <select
                    className="border p-1 rounded"
                    value={filterOrigin}
                    onChange={(e) => setFilterOrigin(e.target.value)}
                  >
                    <option value="">Todos</option>
                    {allOrigins.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>

                  <label className="text-sm">Categoría:</label>
                  <select
                    className="border p-1 rounded"
                    value={filterMoveCategory}
                    onChange={(e) => setFilterMoveCategory(e.target.value)}
                  >
                    <option value="">Todas</option>
                    {allMoveCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Filtros de poder y accuracy</AccordionTrigger>
              <AccordionContent>
                <div
                  className={cn([
                    "mt-0 sm:mt-1 md:mt-2 grid grid-cols-2 md:grid-cols-4 items-center",
                    "gap-1 sm:gap-2 md:gap-4 mt-0 sm:mt-2 md:mt-4",
                  ])}
                >
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-sm">Poder min:</label>
                    <Input
                      type="number"
                      min={0}
                      className="w-20 md:w-32 lg:w-64"
                      value={minPower}
                      onChange={(e) => setMinPower(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-sm">Poder máx:</label>
                    <Input
                      type="number"
                      min={0}
                      className="w-20 md:w-32 lg:w-64"
                      value={maxPower}
                      onChange={(e) => setMaxPower(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-sm">Precisión min:</label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      className="w-20 md:w-32 lg:w-64"
                      value={minAccuracy}
                      onChange={(e) => setMinAccuracy(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-sm">Precisión máx:</label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      className="w-20 md:w-32 lg:w-64"
                      value={maxAccuracy}
                      onChange={(e) => setMaxAccuracy(e.target.value)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {selectedMoves.length >= 4 && (
            <p className="text-red-500 mt-2">
              Solo puedes seleccionar hasta 4 movimientos.
            </p>
          )}

          {/* Lista de movimientos filtrados */}
          <div
            className={cn([
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
              "sm:max-h-40 md:max-h-80 overflow-y-auto",
              "gap-1 sm:gap-2 md:gap-4 mt-0 sm:mt-2 md:mt-4",
            ])}
          >
            {filteredMoves.map((move) => {
              const isSelected = selectedMoves.some(
                (m) => m.internalName === move.internalName
              );
              const isLimitReached = selectedMoves.length >= 4 && !isSelected;

              return (
                <div
                  key={move.internalName}
                  className={cn([
                    "border rounded-lg p-4 shadow cursor-pointer",
                    getTypeColor(move.type),
                    "grid grid-cols-2 text-sm text-black",
                    isSelected && "border-blue-500 bg-blue-50",
                    !isSelected && "border-gray-200 hover:bg-gray-100",
                    isLimitReached && "opacity-50 cursor-not-allowed",
                  ])}
                  onClick={() => !isLimitReached && toggleMoveSelection(move)}
                >
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">{move.name}</h4>
                    <p>Tipo: {move.type}</p>
                    <p>Poder: {move.power}</p>
                    <p>Precisión: {move.accuracy}</p>
                    <p>Origen: {move.origin}</p>
                    <p>Categoría: {move.category}</p>
                    {isSelected && (
                      <span className="text-blue-500 mt-2 block">
                        Seleccionado
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">Description:</h4>
                    <p>{move.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <Button
              className="mt-2 md:mt-4"
              onClick={handleConfirm}
              disabled={selectedMoves.length === 0}
            >
              Confirmar
            </Button>
            <Button
              className="mt-2 md:mt-4"
              onClick={handleReset}
              disabled={selectedMoves.length === 0}
            >
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
