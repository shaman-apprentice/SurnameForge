type Env = {
  PATH_TO_FRONTEND: string;
  PATH_TO_DB: string;
}

export function verifyEnv() {
  for (const key of ["SURNAMEFORGE_PATH_TO_FRONTEND", "SURNAMEFORGE_PATH_TO_DB"]) {
    if (process.env[key] === undefined)
      throw new Error(`Environment var "${key}" must be set!`);
  }
}

export const envConfig: Env = {
  PATH_TO_FRONTEND: process.env.SURNAMEFORGE_PATH_TO_FRONTEND!,
  PATH_TO_DB: process.env.SURNAMEFORGE_PATH_TO_DB!,
  // PATH_TO_FRONTEND: "/mnt/c/Users/Torst/Desktop/ComputerScience/SurnameForge/frontend/dist/surnameforge/browser",
  // PATH_TO_DB: "/mnt/c/Users/Torst/Desktop/ComputerScience/SurnameForge/backend/lowdb",
}
