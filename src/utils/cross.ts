export const cross = (a: string, b: string): string[] =>
  a.split('').map((ai) => b.split('').map(bi => ai+bi)).flat();