import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import { PokemonContext, typeDifficultyType } from "@/pokemon-context";

const allDifficulties: typeDifficultyType[] = [
  "default",
  "easy",
  "normal",
  "hard",
  "absolution",
];

interface SelectDifficultProps {
  className?: string;
}

export const SelectDifficult = ({ className }: SelectDifficultProps) => {
  const { difficultType, setDifficultType } = useContext(PokemonContext)!;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficultType(e.target.value as typeDifficultyType);
  };

  return (
    <div className={cn([className])}>
      <select
        id="difficulty-select"
        value={difficultType}
        onChange={handleChange}
        className="border p-1 rounded text-black"
      >
        {allDifficulties.map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>
    </div>
  );
};
