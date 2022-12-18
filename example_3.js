"use strict";

import path from "path";
import { fileURLToPath } from "url";
import { resolve } from "path";
import Piscina from "piscina";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const piscina = new Piscina({
  filename: resolve(__dirname, "example_3_worker.js"),
});

(async function () {
  console.time("timer");
  const result = await piscina.run({ a: 4, b: 6 });
  await piscina.run({ a: 4, b: 6 });
  console.log(result); // Prints 10
  console.timeEnd("timer");
})();
