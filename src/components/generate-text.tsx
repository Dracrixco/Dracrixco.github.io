import { useContext } from "react";
import { Button } from "./ui/button";
import { PokemonContext } from "../pokemon-context";
import { cn } from "../lib/utils";
import React from "react";

interface GenerateTextButtonProps {
  className?: string;
}

export const GenerateTextButton = ({ className }: GenerateTextButtonProps) => {
  const { pokemons, selectedTrainer, trainerName } =
    useContext(PokemonContext)!;

  const generateText = () => {
    let text = `[${selectedTrainer?.internalName}, ${trainerName}]\n`;
    pokemons.forEach((pokemon) => {
      text += `Pokemon = ${pokemon.id}, 5\n`;
      text += "   Moves = ";
      pokemon.moves.forEach((move) => {
        text += `${move.internalName},`;
      });
      text = text.slice(0, -1);
      text += "\n";
    });
    text +=
      "#==============================================================================";
    navigator.clipboard.writeText(text);
  };

  return (
    <Button onClick={generateText} className={cn([className])}>
      GenerateText
    </Button>
  );
};
