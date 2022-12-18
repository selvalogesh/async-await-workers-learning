import { promisify } from "util";

// Awaitable timers are available in Node.js 15.x+
// For Node.js 12 and 14, use promisify(setTimeout)
import { setTimeout } from "timers/promises";

export default async ({ a, b }) => {
  // Fake some async activity
  await setTimeout(100);
  return a + b;
};
