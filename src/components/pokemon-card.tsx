import React from "react";
import { cn } from "@/lib/utils";

interface PokemonCardProps {
  id: string;
  name: string;
  onSelect: (id: string) => void;
  className?: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  onSelect,
  className,
}) => {
  return (
    <div
      className={cn([
        "flex items-center border border-gray-200 rounded-lg p-2 cursor-pointer transition-colors duration-200 hover:bg-gray-100",
        className,
      ])}
      onClick={() => onSelect(id)}
    >
      <img
        src={`src/images/Front/${id}.png`}
        alt={name}
        className="w-12 h-12 object-cover rounded-full mr-4"
      />
      <div className="flex flex-col">
        <p className="text-sm text-gray-700">ID: {id}</p>
        <p className="text-sm text-gray-900">Name: {name}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
