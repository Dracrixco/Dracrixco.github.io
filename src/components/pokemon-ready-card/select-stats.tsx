import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Pokemon, PokemonContext } from "@/pokemon-context";

const statLabels = [
  "Hp",
  "Ataque",
  "Defensa",
  "Ataque Especial",
  "Defensa Especial",
  "Velocidad",
];

const StatInput: React.FC<{
  label: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}> = ({ label, value, onChange, max }) => (
  <div>
    <Label>{label}</Label>
    <Input
      value={value}
      onChange={(e) => {
        let value = parseInt(e.target.value);
        if (value > max) value = max;
        onChange(value);
      }}
      max={max}
      type="number"
    />
  </div>
);

interface SelectStatsProps {
  pokemon: Pokemon;
  className?: string;
}

export const SelectStats: React.FC<SelectStatsProps> = ({
  pokemon,
  className,
}) => {
  const { updatePokemon } = useContext(PokemonContext)!;
  const [isOpen, setIsOpen] = useState(false);
  //:totalhp, :attack, :defense, :spatk, :spdef, :speed
  const [evs, setEvs] = useState<number[]>(pokemon.evs);
  const [ivs, setIvs] = useState<number[]>(pokemon.ivs);
  const [nature, setNature] = useState<string>(pokemon.nature || "");
  const [happiness, setHapiness] = useState<number>(pokemon.happiness);

  const handleConfirm = () => {
    // Actualiza según tu lógica (ejemplo: un solo item para cada dificultad)
    const updatedPokemon: Pokemon = {
      ...pokemon,
      evs,
      ivs,
      happiness,
      nature,
    };

    updatePokemon(updatedPokemon);
    setIsOpen(false);
  };

  const getTotalEvs = () => evs.reduce((acc, curr) => acc + curr, 0);

  type category = "Attack" | "Defensive" | "SpecialAttack" | "Hp" | "Support";
  const setGenericStatCategory = (category: category) => {
    switch (category) {
      case "Attack":
        setEvs([0, 252, 0, 0, 0, 252]);
        setIvs([31, 31, 31, 31, 31, 31]);
        setNature("Adamant");
        break;
      case "Defensive":
        setEvs([0, 0, 252, 0, 252, 0]);
        setIvs([31, 0, 31, 31, 31, 31]);
        setNature("Bold");
        break;
      case "SpecialAttack":
        setEvs([0, 0, 0, 252, 0, 252]);
        setIvs([31, 0, 31, 31, 31, 31]);
        setNature("Modest");
        break;
      case "Hp":
        setEvs([252, 0, 126, 0, 126, 0]);
        setIvs([31, 0, 31, 31, 31, 31]);
        setNature("Bold");
        break;
      case "Support":
        setEvs([252, 0, 0, 0, 0, 252]);
        setIvs([31, 0, 31, 31, 31, 31]);
        setNature("Timid");
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={cn([className])}>
        <Button className="w-full">Modificar Stats</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Modifica un Stat</DialogTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <h2
            className={cn([
              "col-span-full font-bold",
              getTotalEvs() > 510 && "text-red-500",
            ])}
          >
            Evs {getTotalEvs()}/510
          </h2>
          {statLabels.map((label, index) => (
            <StatInput
              key={index}
              label={label}
              max={252}
              value={evs[index]}
              onChange={function (value: number): void {
                const newEvs = [...evs];
                newEvs[index] = value;
                setEvs(newEvs);
              }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <h2 className="col-span-full font-bold">Ivs</h2>
          {statLabels.map((label, index) => (
            <StatInput
              key={index}
              max={31}
              label={label}
              value={ivs[index]}
              onChange={function (value: number): void {
                const newIvs = [...ivs];
                newIvs[index] = value;
                setIvs(newIvs);
              }}
            />
          ))}
        </div>
        <div>
          <Label>Hapiness</Label>
          <Input
            value={happiness}
            onChange={(e) => setHapiness(parseInt(e.target.value))}
            max={255}
            type="number"
          />
        </div>
        <Button className="mt-4" onClick={handleConfirm}>
          Confirmar
        </Button>

        <DialogFooter className="flex flex-col sm:flex-col sm:space-x-0 space-y-2 mt-2">
          <Button onClick={() => setGenericStatCategory("Attack")}>
            Ataque
          </Button>
          <Button onClick={() => setGenericStatCategory("Defensive")}>
            Defensa
          </Button>
          <Button onClick={() => setGenericStatCategory("SpecialAttack")}>
            Ataque Especial
          </Button>
          <Button onClick={() => setGenericStatCategory("Hp")}>
            Defensa Especial
          </Button>
          <Button onClick={() => setGenericStatCategory("Support")}>
            Support
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
