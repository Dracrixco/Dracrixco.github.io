import React from "react";
import { cn } from "@/lib/utils";

interface TrainerCardProps {
  id: string;
  internalName: string;
  name: string;
  onSelect: (id: string) => void;
  className?: string;
}

const TrainerCard: React.FC<TrainerCardProps> = ({
  id,
  internalName,
  name,
  onSelect,
  className,
}) => {
  return (
    <div
      className={cn([
        "flex flex-col items-center border border-gray-200",
        "rounded-lg p-2 cursor-pointer transition-colors",
        "duration-200 hover:bg-gray-100 relative",
        className,
      ])}
      onClick={() => onSelect(id)}
    >
      <img
        src={`./images/Trainers/${id}.png`}
        alt={name}
        className="object-cover"
      />

      <div
        className={cn([
          "flex flex-col absolute bottom-0 bg-black bg-opacity-50 w-full",
          "text-white p-2 rounded-b-lg text-center",
        ])}
      >
        <p>{internalName}</p>
        <p>{name}</p>
      </div>
    </div>
  );
};

export default TrainerCard;
