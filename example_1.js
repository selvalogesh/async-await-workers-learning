"use strict";

import { promisify } from "util";
const wait = promisify(setTimeout);

// function wait(time) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });
// }
async function main() {
  console.time("timer");
  //   const [data, data2] = await Promise.all([
  //     fetch("https://jsonplaceholder.typicode.com/todos/1"),
  //     fetch("https://jsonplaceholder.typicode.com/todos/1"),
  //   ]);
  //   const [value, value2] = await Promise.all([data.json(), data2.json()]);
  //   console.log(value);
  //   console.log(value2);

  await wait(1000);
  await wait(1000);
  await Promise.all([wait(1000), wait(1000)]);
  console.timeEnd("timer");
}

main();
