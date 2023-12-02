import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";
import { part1, part2 } from "./solution.ts";

Deno.test(function part1Test() {
  const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
  assertEquals(part1(input), 142);
});

Deno.test(function part2Test() {
  const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
  assertEquals(part2(input), 281);
});
