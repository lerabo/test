declare namespace NodeJS {
  export interface ProcessEnv {
    SECRET_COOKIE?: string;
    JWT_SECRET?: string;
    MONGO_DB?: string;
    NODE_ENV: string;
  }
}
