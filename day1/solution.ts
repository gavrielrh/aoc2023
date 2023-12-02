export function getFirstDigitPart1(input: string): string {
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (
      c === "0" || c === "1" || c === "2" || c === "3" || c === "4" ||
      c === "5" || c === "6" || c === "7" || c === "8" || c === "9"
    ) {
      return c;
    }
  }
  throw new Error(`No first digit found :( ${input}`);
}

export function getLastDigitPart1(input: string): string {
  for (let i = input.length - 1; i >= 0; i--) {
    const c = input[i];
    if (
      c === "0" || c === "1" || c === "2" || c === "3" || c === "4" ||
      c === "5" || c === "6" || c === "7" || c === "8" || c === "9"
    ) {
      return c;
    }
  }
  throw new Error(`No last digit found :( ${input}`);
}

export function getFirstDigitPart2(input: string): string {
  function match(
    compareTo: string,
    startFrom: number,
    numChars: number,
  ): boolean {
    for (let i = 0; i < numChars; i++) {
      if (input[startFrom + i] !== compareTo[i]) {
        return false;
      }
    }
    return true;
  }
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (
      c === "0" || c === "1" || c === "2" || c === "3" || c === "4" ||
      c === "5" || c === "6" || c === "7" || c === "8" || c === "9"
    ) {
      return c;
    }
    // z -> check if next three chars are ero
    if (c === "z" && match("ero", i + 1, 3)) {
      return "0";
    }
    // o -> check if next two chars are ne
    if (c === "o" && match("ne", i + 1, 2)) {
      return "1";
    }
    // t -> check if next two chars are wo
    //   -> check if next four chars are hree
    if (c === "t") {
      if (match("wo", i + 1, 2)) {
        return "2";
      }
      if (match("hree", i + 1, 4)) {
        return "3";
      }
    }
    // f -> check if next four chars are our
    //   -> check if next four chars are ive
    if (c === "f") {
      if (match("our", i + 1, 3)) {
        return "4";
      }
      if (match("ive", i + 1, 3)) {
        return "5";
      }
    }
    // s -> check if next two chars are ix
    //   -> check if next four chars are even
    if (c === "s") {
      if (match("ix", i + 1, 2)) {
        return "6";
      }
      if (match("even", i + 1, 4)) {
        return "7";
      }
    }
    // e -> check if next four chars are ight
    if (c === "e" && match("ight", i + 1, 4)) {
      return "8";
    }
    // n -> check if next three chars are ine
    if (c === "n" && match("ine", i + 1, 3)) {
      return "9";
    }
  }
  throw new Error(`No first digit found :( ${input}`);
}

export function getLastDigitPart2(input: string): string {
  function match(
    compareTo: string,
    startFrom: number,
    numChars: number,
  ): boolean {
    for (let i = 0; i < numChars; i++) {
      if (input[startFrom - i] !== compareTo[i]) {
        return false;
      }
    }
    return true;
  }
  for (let i = input.length - 1; i >= 0; i--) {
    const c = input[i];
    if (
      c === "0" || c === "1" || c === "2" || c === "3" || c === "4" ||
      c === "5" || c === "6" || c === "7" || c === "8" || c === "9"
    ) {
      return c;
    }
    // zero -> orez
    // two -> owt
    if (c === "o") {
      if (match("rez", i - 1, 3)) {
        return "0";
      }
      if (match("wt", i - 1, 2)) {
        return "2";
      }
    }
    // one -> eno
    // three -> eerht
    // five -> evif
    // nine -> enin
    if (c === "e") {
      if (match("no", i - 1, 2)) {
        return "1";
      }
      if (match("erht", i - 1, 4)) {
        return "3";
      }
      if (match("vif", i - 1, 3)) {
        return "5";
      }
      if (match("nin", i - 1, 3)) {
        return "9";
      }
    }
    // four -> ruof
    if (c === "r" && match("uof", i - 1, 3)) {
      return "4";
    }
    // six -> xis
    if (c === "x" && match("is", i - 1, 2)) {
      return "6";
    }
    // seven -> neves
    if (c === "n" && match("eves", i - 1, 4)) {
      return "7";
    }
    // eight -> thgie
    if (c === "t" && match("hgie", i - 1, 4)) {
      return "8";
    }
  }
  throw new Error(`No last digit found :( ${input}`);
}

/**
 * Get each line
 * For each line, get the first digit and the last digit
 * Combine these digits together ('1' + '2' = '12') into a line value
 * Sum the value of each line
 */
export function part1(input: string): number {
  const lines = input.split("\n").filter((line) => line.length > 0);
  let sum = 0;
  lines.forEach((line) => {
    const firstDigit = getFirstDigitPart1(line);
    const lastDigit = getLastDigitPart1(line);
    const value = parseInt(firstDigit + lastDigit, 10);
    sum += value;
  });
  return sum;
}

export function part2(input: string): number {
  const lines = input.split("\n").filter((line) => line.length > 0);
  let sum = 0;
  lines.forEach((line) => {
    const firstDigit = getFirstDigitPart2(line);
    const lastDigit = getLastDigitPart2(line);
    const value = parseInt(firstDigit + lastDigit, 10);
    sum += value;
  });
  return sum;
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("./input.txt");
  console.log(part1(input));
  console.log(part2(input));
}
