import "./dotenv";
import { required } from ".";

export const config = {
  host: {
    port: required("PORT", "3000"),
  },
  jwt: {
    secretKey: required("JWT_SECRET_TOKEN"),
    refreshSecretKey: required("JWT_SECRET_REFRESH"),
    expiresInSec: required("JWT_EXPIRES_SEC_TOKEN"),
    refreshExpiresInSec: required("JWT_EXPIRES_SEC_REFRESH"),
  },
  bcrypt: {
    saltRounds: required("BCRYPT_SALT_ROUNDS", "12"),
  },
};
