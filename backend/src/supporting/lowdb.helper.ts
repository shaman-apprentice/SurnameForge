import path from "node:path";
import fs from "node:fs/promises"
import { envConfig } from "../env.config";

export async function getDb<T>(filePath: string, initialValue: T) {
  // NestJS doesn't support ESM -.- - so use dynamic imports in combination with TS `moduleResolution: Node16`
  const { JSONFilePreset } = await import("lowdb/node");

  const fullPath = path.join(envConfig.PATH_TO_DB, filePath);
  await ensureDirExists(fullPath);
  
  return await JSONFilePreset<T>(fullPath, initialValue);
}

async function ensureDirExists(fullPath: string): Promise<void> {
  const targetDir = path.dirname(fullPath);
  try {
    await fs.access(targetDir);
    return;
  } catch (err) {
    console.warn("Cannot access folder for requested db; try to create it", err);
    await fs.mkdir(targetDir, { recursive: true });
  }
}
