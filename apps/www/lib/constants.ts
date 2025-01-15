const BASE_URL = process.env.BASE_URL
const BASE_URL_2 = process.env.BASE_URL_2
const REDDIT_URL = process.env.REDDIT_URL
const LLAMA_URL = process.env.LLAMA_URL

if (!BASE_URL || !BASE_URL_2) {
  throw new Error(`BASE_URL is required, .env is not supplied`)
}

if (!REDDIT_URL || !LLAMA_URL) {
  throw new Error(`REDDIS_URL or LLAMA_URL is required, .env is not supplied`)
}

export { BASE_URL, BASE_URL_2, REDDIT_URL, LLAMA_URL }
