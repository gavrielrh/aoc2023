type Cube = {
  count: number;
  color: string;
};

type Subset = Cube[];

type Game = {
  id: number;
  subsets: Subset[];
};

export function lineToGame(line: string): Game {
  const [idPart, subsetsPart] = line.split(":");
  const [_, idString] = idPart.split(" ");
  const id = parseInt(idString, 10);
  const subsets: Subset[] = subsetsPart
    .split(";")
    .map((subsetString): Subset => (
      subsetString.trim().split(",")
        .map((subset): Cube => {
          const [count, color] = subset.trim().split(" ");
          return {
            count: parseInt(count),
            color,
          };
        })
    ));
  return {
    id,
    subsets,
  };
}

export function part1(input: string): number {
  const amounts: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const lines = input.split("\n").filter((line) => line.length > 0);
  const games = lines.map(lineToGame);
  let sum = 0;
  games.forEach((game) => {
    if (
      !game.subsets.some((subset) =>
        subset.some((cube) => cube.count > amounts[cube.color])
      )
    ) {
      sum += game.id;
    }
  });
  return sum;
}

export function part2(input: string): number {
  const lines = input.split("\n").filter((line) => line.length > 0);
  const games = lines.map(lineToGame);
  let sum = 0;
  games.forEach((game) => {
    const counts: Record<string, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };
    game.subsets.forEach((subset) => {
      subset.forEach((cube) => {
        if (counts[cube.color] < cube.count) {
          counts[cube.color] = cube.count;
        }
      });
    });
    sum += Object.values(counts).reduce((acc, cur) => acc * cur, 1);
  });
  return sum;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("./input.txt");
  console.log(part1(input));
  console.log(part2(input));
}
