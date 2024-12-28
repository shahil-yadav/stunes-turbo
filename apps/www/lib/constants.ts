export const BASE_URL = process.env.BASE_URL;
if (!BASE_URL) throw new Error(`BASE_URL is required, .env is not supplied`);
