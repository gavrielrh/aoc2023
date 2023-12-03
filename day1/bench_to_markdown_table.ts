type Bench = {
  name: string;
  results: {
    ok: {
      n: number;
      min: number;
      max: number;
      avg: number;
      p75: number;
      p99: number;
      p995: number;
      p999: number;
    };
  }[];
};

type BenchResults = {
  runtime: string;
  cpu: string;
  benches: Bench[];
};

const command = new Deno.Command(Deno.execPath(), {
  args: [
    "bench",
    "--json",
    "--allow-read",
  ],
});

const { code, stdout } = await command.output();

const input = new TextDecoder().decode(stdout);

const { benches, runtime, cpu } = JSON.parse(input) as BenchResults;

const tableHeaders = [
  "benchmark",
  "time (avg)",
  "iter/s",
  "(min ... max)",
  "p75",
  "p99",
  "p995",
];

console.log(benches[0].results[0]);

const tableRows = benches.map(
  (bench) => [
    bench.name,
    `${bench.results[0].ok.avg / 1000} µs/iter`,
    bench.results[0].ok.n,
    `(${bench.results[0].ok.min / 1000} µs... ${
      bench.results[0].ok.max / 1000
    } µs)`,
    `${bench.results[0].ok.p75 / 1000} µs`,
    `${bench.results[0].ok.p99 / 1000} µs`,
    `${bench.results[0].ok.p995 / 1000} µs`,
  ],
);

let output = `runtime: ${runtime}\ncpu: ${cpu}\n\n`;
output += `| ${tableHeaders.join(" | ")} |\n`;
output += `| ${tableHeaders.map((_) => "---").join(" | ")} |\n`;
tableRows.forEach((row) => {
  output += `| ${row.join(" | ")} |\n`;
});

console.log(output);
