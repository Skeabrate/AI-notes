import { User } from "./user";

export {};

declare global {
  interface CustomJwtSessionClaims extends User {}
}
