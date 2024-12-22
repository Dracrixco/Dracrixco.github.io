import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import TrainerCard from "./trainer-card";
import { trainersDataType } from "../data/DataInterfaces";
import { trainersData } from "@/data";
import { Button } from "./ui/button";
import { PokemonContext } from "@/pokemon-context";
import { useEffect } from "react";

interface SelectTrainerTypeProps {
  onChange?: (id: string) => void;
}

const SelectTrainerType: React.FC<SelectTrainerTypeProps> = ({ onChange }) => {
  const { selectedTrainer, setSelectedTrainer } = useContext(PokemonContext)!;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrainers, setFilteredTrainers] = useState<trainersDataType[]>(
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFilteredTrainers(trainersData);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = trainersData.filter((trainer) =>
        trainer.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTrainers(filtered);
    } else {
      setFilteredTrainers(trainersData);
    }
  };

  const handleSelect = (id: string) => {
    const trainer = trainersData.find((trainer) => trainer.internalName === id);
    if (trainer) {
      setSelectedTrainer(trainer);
      if (onChange) {
        onChange(trainer.internalName);
      }
      setIsOpen(false);
    }
  };

  return (
    <div className="mx-auto">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {selectedTrainer ? (
            <TrainerCard
              id={selectedTrainer.internalName}
              internalName={selectedTrainer.internalName}
              name={selectedTrainer.name}
              onSelect={function (id: string): void {
                console.log(id);
                setIsOpen(true);
              }}
            />
          ) : (
            <Button>Seleccionar Entrenador</Button>
          )}
        </DialogTrigger>
        <DialogContent className="md:min-w-max">
          <DialogTitle>Selecciona un Tipo de Entrenador</DialogTitle>
          <DialogDescription>
            Usa el siguiente campo para buscar y seleccionar un entrenador.
          </DialogDescription>
          <label>Buscar Entrenador</label>
          <Input
            name="trainer-search"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <div className="max-h-96 overflow-y-auto mt-4 space-y-2 grid-cols-1 sm:grid-cols-2 grid md:grid-cols-3 gap-2">
            {filteredTrainers.map((trainer) => (
              <TrainerCard
                key={trainer.internalName}
                id={trainer.internalName}
                internalName={trainer.internalName}
                name={trainer.name}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectTrainerType;
