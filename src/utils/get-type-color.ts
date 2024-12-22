export type PokemonType =
  | "BUG"
  | "DARK"
  | "DRAGON"
  | "ELECTRIC"
  | "FAIRY"
  | "FIGHTING"
  | "FIRE"
  | "FLYING"
  | "GHOST"
  | "GRASS"
  | "GROUND"
  | "ICE"
  | "NORMAL"
  | "POISON"
  | "PSYCHIC"
  | "ROCK"
  | "STEEL"
  | "WATER";

export const allTypes: PokemonType[] = [
  "BUG",
  "DARK",
  "DRAGON",
  "ELECTRIC",
  "FAIRY",
  "FIGHTING",
  "FIRE",
  "FLYING",
  "GHOST",
  "GRASS",
  "GROUND",
  "ICE",
  "NORMAL",
  "POISON",
  "PSYCHIC",
  "ROCK",
  "STEEL",
  "WATER",
];

export const getTypeColor = (type: PokemonType): string => {
  switch (type) {
    case "BUG":
      return "bg-gradient-to-r from-green-200 to-green-400";
    case "DARK":
      return "bg-gradient-to-r from-gray-600 to-gray-800";
    case "DRAGON":
      return "bg-gradient-to-r from-indigo-300 to-indigo-600";
    case "ELECTRIC":
      return "bg-gradient-to-r from-yellow-200 to-yellow-400";
    case "FAIRY":
      return "bg-gradient-to-r from-pink-200 to-pink-300";
    case "FIGHTING":
      return "bg-gradient-to-r from-red-400 to-red-600";
    case "FIRE":
      return "bg-gradient-to-r from-red-300 to-red-500";
    case "FLYING":
      return "bg-gradient-to-r from-blue-200 to-blue-300";
    case "GHOST":
      return "bg-gradient-to-r from-purple-500 to-purple-700";
    case "GRASS":
      return "bg-gradient-to-r from-green-300 to-green-400";
    case "GROUND":
      return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    case "ICE":
      return "bg-gradient-to-r from-blue-100 to-blue-200";
    case "NORMAL":
      return "bg-gradient-to-r from-gray-300 to-gray-400";
    case "POISON":
      return "bg-gradient-to-r from-purple-400 to-purple-500";
    case "PSYCHIC":
      return "bg-gradient-to-r from-pink-400 to-pink-500";
    case "ROCK":
      return "bg-gradient-to-r from-yellow-600 to-yellow-700";
    case "STEEL":
      return "bg-gradient-to-r from-gray-400 to-gray-500";
    case "WATER":
      return "bg-gradient-to-r from-blue-300 to-blue-500";
    default:
      return "bg-gradient-to-r from-gray-100 to-gray-200"; // Default gradient if type is not recognized
  }
};
