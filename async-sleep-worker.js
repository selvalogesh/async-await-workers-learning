"use strict";
import { setTimeout } from "timers/promises";

export default async () => {
  // Fake some async activity
  await setTimeout(100);
  return "Hello async worker wait World!";
};
