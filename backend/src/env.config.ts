type Env = {
  SURNAMEFORGE_PATH_TO_FRONTEND: string;
  SURNAMEFORGE_PATH_TO_DB: string;
}

export function verifyEnv() {
  for (const key of ["SURNAMEFORGE_PATH_TO_FRONTEND", "SURNAMEFORGE_PATH_TO_DB"]) {
    if (process.env[key] === undefined)
      throw new Error(`Environment var "${key}" must be set!`);
  }
}

export const envConfig: Env = {
  SURNAMEFORGE_PATH_TO_FRONTEND: process.env.SURNAMEFORGE_PATH_TO_FRONTEND!,
  SURNAMEFORGE_PATH_TO_DB: process.env.SURNAMEFORGE_PATH_TO_DB!,
  // SURNAMEFORGE_PATH_TO_FRONTEND: "/home/ts/Desktop/ComputerScience/SurnameForge/frontend/dist/surnameforge/browser",
  // SURNAMEFORGE_PATH_TO_DB: "/home/ts/Desktop/ComputerScience/SurnameForge/backend/lowdb",
}
