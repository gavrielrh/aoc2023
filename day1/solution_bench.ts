import { part1 } from "./solution.ts";
import { part2 } from "./solution.ts";

// @ts-ignore
Deno.bench("part1", (b) => {
  const input = Deno.readTextFileSync("./input.txt");
  b.start();
  part1(input);
  b.end();
});

// @ts-ignore
Deno.bench("part2", (b) => {
  const input = Deno.readTextFileSync("./input.txt");
  b.start();
  part2(input);
  b.end();
});
