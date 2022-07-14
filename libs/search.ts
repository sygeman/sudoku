import { SQUARES } from "../constants";
import { assign } from "./assign";

/* Given a map of squares -> candiates, using depth-first search, 
  recursively try all possible values until a solution is found, or false
  if no solution exists. */
export function search(candidates: any): any {
  // Return if error in previous iteration
  if (!candidates) return false;

  // If only one candidate for every square, we've a solved puzzle!
  // Return the candidates map.
  let maxNrCandidates = 0;
  let maxCandidatesSquare = null;
  for (const si in SQUARES) {
    const square = SQUARES[si];
    const nrCandidates = candidates[square].length;

    if (nrCandidates > maxNrCandidates) {
      maxNrCandidates = nrCandidates;
      maxCandidatesSquare = square;
    }
  }

  if (maxNrCandidates === 1) return candidates;

  // Choose the blank square with the fewest possibilities > 1
  let minNrCandidates = 10;
  let minCandidatesSquare = "";
  for (const si in SQUARES) {
    const square = SQUARES[si];
    const nrCandidates = candidates[square].length;

    if (nrCandidates < minNrCandidates && nrCandidates > 1) {
      minNrCandidates = nrCandidates;
      minCandidatesSquare = square;
    }
  }

  // Recursively search through each of the candidates of the square
  // starting with the one with fewest candidates.

  // Rotate through the candidates forwards
  const minCandidates = candidates[minCandidatesSquare];

  for (const vi in minCandidates) {
    const val = minCandidates[vi];

    // TODO: Implement a non-rediculous deep copy function
    const candidatesCopy = JSON.parse(JSON.stringify(candidates));
    const candidatesNext: any = search(
      assign(candidatesCopy, minCandidatesSquare, val)
    );

    if (candidatesNext) return candidatesNext;
  }

  // If we get through all combinations of the square with the fewest
  // candidates without finding an answer, there isn't one. Return false.
  return false;
}
