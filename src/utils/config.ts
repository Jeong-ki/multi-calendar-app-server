import "./dotenv";
import { required } from ".";

export const config = {
  host: {
    port: required("PORT", "3000"),
  },
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: required("JWT_EXPIRES_SEC", "86400"),
  },
  bcrypt: {
    saltRounds: required("BCRYPT_SALT_ROUNDS", "12"),
  },
};
