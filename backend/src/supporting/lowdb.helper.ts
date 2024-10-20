import { join as joinPath } from "path";
import { envConfig } from "../env.conig";

export async function getDb<T>(filePath: string, initialValue: T) {
  // NestJS doesn't support ESM -.- - so use dynamic imports in combination with TS `moduleResolution: Node16`
  const { JSONFilePreset } = await import("lowdb/node");
  return await JSONFilePreset<T>(joinPath(envConfig.PATH_TO_DB, filePath), initialValue);
}
