export type PokemonType =
  | "Bug"
  | "Dark"
  | "Dragon"
  | "Electric"
  | "Fairy"
  | "Fighting"
  | "Fire"
  | "Flying"
  | "Ghost"
  | "Grass"
  | "Ground"
  | "Ice"
  | "Normal"
  | "Poison"
  | "Psychic"
  | "Rock"
  | "Steel"
  | "Water";

export const allTypes: PokemonType[] = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
];

export const getTypeColor = (type: PokemonType): string => {
  switch (type) {
    case "Bug":
      return "bg-gradient-to-r from-green-200 to-green-400";
    case "Dark":
      return "bg-gradient-to-r from-gray-600 to-gray-800";
    case "Dragon":
      return "bg-gradient-to-r from-indigo-300 to-indigo-600";
    case "Electric":
      return "bg-gradient-to-r from-yellow-200 to-yellow-400";
    case "Fairy":
      return "bg-gradient-to-r from-pink-200 to-pink-300";
    case "Fighting":
      return "bg-gradient-to-r from-red-400 to-red-600";
    case "Fire":
      return "bg-gradient-to-r from-red-300 to-red-500";
    case "Flying":
      return "bg-gradient-to-r from-blue-200 to-blue-300";
    case "Ghost":
      return "bg-gradient-to-r from-purple-500 to-purple-700";
    case "Grass":
      return "bg-gradient-to-r from-green-300 to-green-400";
    case "Ground":
      return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    case "Ice":
      return "bg-gradient-to-r from-blue-100 to-blue-200";
    case "Normal":
      return "bg-gradient-to-r from-gray-300 to-gray-400";
    case "Poison":
      return "bg-gradient-to-r from-purple-400 to-purple-500";
    case "Psychic":
      return "bg-gradient-to-r from-pink-400 to-pink-500";
    case "Rock":
      return "bg-gradient-to-r from-yellow-600 to-yellow-700";
    case "Steel":
      return "bg-gradient-to-r from-gray-400 to-gray-500";
    case "Water":
      return "bg-gradient-to-r from-blue-300 to-blue-500";
    default:
      return "bg-gradient-to-r from-gray-100 to-gray-200"; // Default gradient if type is not recognized
  }
};
