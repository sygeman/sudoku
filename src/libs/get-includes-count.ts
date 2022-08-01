export const getIncludesCount = (board: string, arrayLength = 9): {[key: string] : number} =>
  Object.fromEntries(Array(arrayLength).fill(null)
    .map((_, i) => [i+1, (board.match(new RegExp(`${i+1}`, "g")) || []).length]))
