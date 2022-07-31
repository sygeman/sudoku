import { DIFFICULTY } from "../constants";

export const useDifficulty = (difficulty: number) => {
  if (difficulty > DIFFICULTY.medium) return "Hard";
  if (difficulty > DIFFICULTY.easy) return "Medium";
  return "Easy";
};
