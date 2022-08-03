/* Force `nr` to be within the range from `min` to, but not including, 
`max`. `min` is optional, and will default to 0. If `nr` is undefined,
treat it as zero. */
export const forceRange = (nr = 0, max: number, min = 0): number => Math.max(Math.min(nr, max), min);