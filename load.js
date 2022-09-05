import fs from "fs";
import { run } from "./index.js";

const file = process.argv[2];
const code = fs.readFileSync(file, "utf-8");
let [_, error] = run(file, code);

if (error) {
  console.log(error.asString());
}