const BASE_URL = process.env.BASE_URL
const BASE_URL_2 = process.env.BASE_URL_2

if (!BASE_URL || !BASE_URL_2) {
  throw new Error(`BASE_URL is required, .env is not supplied`)
}

export { BASE_URL, BASE_URL_2 }
