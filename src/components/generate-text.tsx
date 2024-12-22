import { useContext } from "react";
import { Button } from "./ui/button";
import { PokemonContext } from "../pokemon-context";
import { cn } from "../lib/utils";
import { typeDifficultyType } from "../pokemon-context";

interface GenerateTextButtonProps {
  className?: string;
  onTextGenerated?: (text: string) => void;
}

export const GenerateTextButton = ({
  className,
  onTextGenerated,
}: GenerateTextButtonProps) => {
  const {
    pokemons,
    selectedTrainer,
    trainerName,
    startText,
    endText,
    trainerLevel,
  } = useContext(PokemonContext)!;

  const generateText = () => {
    let text = "#-------------------------------\n";
    text += `[${selectedTrainer?.internalName},${trainerName}]\n`;
    const difficultTypes: typeDifficultyType[] = [
      "default",
      "easy",
      "normal",
      "hard",
      "absolution",
    ];
    text += `LoseText = ${endText}\n`;
    text += `StartText = ${startText}\n`;
    pokemons.forEach((pokemon) => {
      text += `Pokemon = ${pokemon.id},${trainerLevel}\n`;
      text += `   Pokeball = ${pokemon.pokeball?.internalName || "POKEBALL"}\n`;
      difficultTypes.forEach((difficultType) => {
        // Moves
        if (difficultType === "default") {
          text += "   Moves = ";
        } else {
          text += `   Moves_${difficultType} = `;
        }
        pokemon.moves[difficultType].forEach((move) => {
          text += `${move.internalName},`;
        });
        text = text.slice(0, -1);
        text += "\n";
      });

      difficultTypes.forEach((difficultType) => {
        if (difficultType === "default") {
          text += `   Item = ${pokemon.item.default?.internalName}\n`;
        } else {
          text += `   Item_${difficultType} = ${pokemon.item[difficultType]?.internalName}\n`;
        }
      });

      difficultTypes.forEach((difficultType) => {
        if (difficultType === "default") {
          text += `   AbilityIndex = ${pokemon.abilityIndex.default}\n`;
        } else {
          text += `   AbilityIndex_${difficultType} = ${pokemon.abilityIndex[difficultType]}\n`;
        }
      });
    });

    if (onTextGenerated) {
      onTextGenerated(text);
    }
    navigator.clipboard.writeText(text);
  };

  return (
    <Button onClick={generateText} className={cn([className])}>
      GenerateText
    </Button>
  );
};
