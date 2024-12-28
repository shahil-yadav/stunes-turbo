import { loadEnvConfig } from "@next/env";
import path from "node:path";

const projectDir = path.dirname(
  process.cwd().split(path.sep).slice(0, -1).join(path.sep),
);

loadEnvConfig(projectDir);

export const BASE_URL = process.env.BASE_URL;
if (!BASE_URL)
  throw new Error("BASE_URL is required, please set the env variables");
