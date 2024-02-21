import "./dotenv";

export const required = (key: string, defaultValue: string | null = null) => {
  const value = process.env[key] || defaultValue;
  if (value === null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
};
