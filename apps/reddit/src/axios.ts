import { getAccessTokenFromReddit } from "./api/auth"
import axios, { AxiosInstance } from "axios"

export class AxiosManager {
  static httpClient: AxiosInstance | null = null
  static username = "No_Studio5790"
  static password = "Pyfsyd-zyhvaj-gihza6"

  static async authenticate() {
    try {
      const accessToken = await getAccessTokenFromReddit({
        username: AxiosManager.username,
        password: AxiosManager.password
      })

      AxiosManager.httpClient = axios.create({
        baseURL: "https://oauth.reddit.com",
        headers: {
          Cookie:
            "csv=2; edgebucket=KooH1ygarLUNgn2CXu; loid=0000000000slqa48vf.2.1663515658000.Z0FBQUFBQm5lODg4Tkw0Ui02X1FsSHhFZTVaY2tJYzk0d0RTMUFmQUIxd05nUzRrT09ocUhfa1ZCODhoVlpDa2V2ZGRHZVQ4ZTJNQXJMTmNTXy1DTnVHVkEtMzdZeVVZb3ZWUlczQk92Nk5DcF9QS0c4X1Z1VFkxX0JkOVZFTERWMW44YzAyZnhCcmo",
          Authorization: `bearer ${accessToken}`
        }
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  static async getHttpClient() {
    if (AxiosManager.httpClient === null) {
      const success = await AxiosManager.authenticate()
      if (!success) throw new Error("Authentication failed with Reddit 🚫")
    }

    if (AxiosManager.httpClient === null) throw new Error("HttpClient is undefined")
    return AxiosManager.httpClient
  }
}

export function getAxiosClient() {
  return AxiosManager.getHttpClient()
}
