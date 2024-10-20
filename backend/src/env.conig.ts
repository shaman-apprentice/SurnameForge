import * as dotenv from 'dotenv';

type Env = {
  PATH_TO_FRONTEND: string;
  PATH_TO_DB: string;
}

const envFile = process.env.NODE_ENV === 'production'
  ? 'env/.env.production'
  : 'env/.env.development';
export const envConfig = dotenv.config({ path: envFile }).parsed as Env;
