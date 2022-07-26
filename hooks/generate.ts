import { useRouter } from "next/router";
import { generate } from "../libs/generate";

export const useGenerate = () => {
  const router = useRouter();

  return {
    generate: () => {
      const board = generate();
      router.push(`/game/${board}`);
    },
  };
};
