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
    if (endText) {
      text += `LoseText = ${endText}\n`;
    }
    if (startText) {
      text += `StartText = ${startText}\n`;
    }
    pokemons.forEach((pokemon) => {
      text += `Pokemon = ${pokemon.id},${trainerLevel}\n`;
      text += `   Ball = ${pokemon.pokeball?.internalName || "POKEBALL"}\n`;
      text += `   EV = ${pokemon.evs.join(",")}\n`;
      if (pokemon.nature) {
        text += `   Nature = ${pokemon.nature}\n`;
      }
      text += `   Iv = ${pokemon.ivs.join(",")}\n`;
      if (pokemon.isCorrupted != undefined) {
        text += `   Corrupted = ${pokemon.isCorrupted}\n`;
      }
      text += `   Happiness = ${pokemon.happiness}\n`;
      difficultTypes.forEach((difficultType) => {
        if (pokemon.moves[difficultType].length > 0) {
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
        }
      });

      difficultTypes.forEach((difficultType) => {
        if (pokemon.item[difficultType]) {
          if (difficultType === "default") {
            text += `   Item = ${pokemon.item.default?.internalName}\n`;
          } else {
            text += `   Item_${difficultType} = ${pokemon.item[difficultType].internalName}\n`;
          }
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
    console.clear();
    console.log(text);
    navigator.clipboard.writeText(text);
  };

  return (
    <Button onClick={generateText} className={cn([className])}>
      GenerateText
    </Button>
  );
};
