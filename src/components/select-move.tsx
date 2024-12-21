import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { movesData } from "@/data/pageData";
import { movesDataType } from "@/data/dataTypes";

interface SelectMoveProps {
  moves: string[];
  tutorMoves?: string[];
  eggMoves?: string[];
}

interface ReadyMove extends movesDataType {
  category: "Movimiento" | "Movimientos de Tutor" | "Movimientos de Huevo";
}

const SelectMove: React.FC<SelectMoveProps> = ({
  moves,
  eggMoves = [],
  tutorMoves = [],
}) => {
  const [readyMoves, setReadyMoves] = useState<ReadyMove[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMoves, setFilteredMoves] = useState<ReadyMove[]>([]);
  const [selectedMoves, setSelectedMoves] = useState<ReadyMove[]>([]);

  useEffect(() => {
    const mapMoves = (
      internalNames: string[],
      category: ReadyMove["category"]
    ): ReadyMove[] => {
      return internalNames
        .map((internalName) => {
          const move = movesData.find((m) => m.internalName === internalName);
          if (move) {
            return { ...move, category };
          }
          return null;
        })
        .filter((move): move is ReadyMove => move !== null);
    };

    let standardMoves = mapMoves(moves, "Movimiento");
    if (tutorMoves) {
      const tutorMovesMapped = mapMoves(tutorMoves, "Movimientos de Tutor");
      standardMoves = [...standardMoves, ...tutorMovesMapped];
    }
    if (eggMoves) {
      const eggMovesMapped = mapMoves(eggMoves, "Movimientos de Huevo");
      standardMoves = [...standardMoves, ...eggMovesMapped];
    }

    // Remove duplicates based on internalName
    const uniqueMovesMap: { [key: string]: ReadyMove } = {};
    standardMoves.forEach((move) => {
      if (!uniqueMovesMap[move.internalName]) {
        uniqueMovesMap[move.internalName] = move;
      }
    });
    const uniqueMoves = Object.values(uniqueMovesMap);

    setReadyMoves(uniqueMoves);
    setSelectedMoves([
      uniqueMoves[0],
      uniqueMoves[1],
      uniqueMoves[2],
      uniqueMoves[3],
    ]);
  }, [moves, tutorMoves, eggMoves]);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = readyMoves.filter(
      (move) =>
        move.name.toLowerCase().includes(lowerSearch) ||
        move.type.toLowerCase().includes(lowerSearch) ||
        move.category.toLowerCase().includes(lowerSearch)
    );
    setFilteredMoves(filtered);
  }, [searchTerm, readyMoves]);

  const toggleMoveSelection = (move: ReadyMove) => {
    const isSelected = selectedMoves.find(
      (m) => m.internalName === move.internalName
    );
    if (isSelected) {
      setSelectedMoves(
        selectedMoves.filter((m) => m.internalName !== move.internalName)
      );
    } else {
      if (selectedMoves.length < 4) {
        setSelectedMoves([...selectedMoves, move]);
      }
    }
  };

  const handleConfirm = () => {
    setReadyMoves(selectedMoves);
    setIsOpen(false);
  };

  return (
    <div className="w-full bg-gray-100 p-2">
      <div>
        <h3 className="text-lg font-semibold">Movimientos Seleccionados</h3>
        {readyMoves.length === 0 ? (
          <p className="text-gray-500">No hay movimientos seleccionados.</p>
        ) : (
          <div className="grid grid-cols-2">
            {selectedMoves.map((move) => (
              <p>{move.name}</p>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="mt-2 w-full">Editar Movimientos</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogTitle>Selecciona Movimientos</DialogTitle>
          <DialogDescription>
            Busca y selecciona hasta 4 movimientos que deseas asignar.
          </DialogDescription>
          <Input
            name="move-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar Movimiento"
            className="mt-4"
          />
          {selectedMoves.length >= 4 && (
            <p className="text-red-500 mt-2">
              Solo puedes seleccionar hasta 4 movimientos.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 max-h-80 overflow-y-auto">
            {filteredMoves.map((move) => (
              <div
                key={move.internalName}
                className={`border rounded-lg p-4 cursor-pointer shadow ${
                  selectedMoves.find(
                    (m) => m.internalName === move.internalName
                  )
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-100"
                } ${
                  selectedMoves.length >= 4 &&
                  !selectedMoves.find(
                    (m) => m.internalName === move.internalName
                  )
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  if (
                    selectedMoves.find(
                      (m) => m.internalName === move.internalName
                    )
                  ) {
                    toggleMoveSelection(move);
                  } else if (selectedMoves.length < 4) {
                    toggleMoveSelection(move);
                  }
                }}
              >
                <h4 className="text-lg font-semibold">{move.name}</h4>
                <p className="text-sm text-gray-600">Tipo: {move.type}</p>
                <p className="text-sm text-gray-600">Potencia: {move.power}</p>
                <p className="text-sm text-gray-600">
                  Precisión: {move.accuracy}
                </p>
                <p className="text-sm text-gray-600">
                  Categoría: {move.category}
                </p>
                {selectedMoves.find(
                  (m) => m.internalName === move.internalName
                ) && (
                  <span className="text-blue-500 mt-2 block">Seleccionado</span>
                )}
              </div>
            ))}
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

export default SelectMove;
