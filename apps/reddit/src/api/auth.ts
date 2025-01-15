import express from "express"
import MessageResponse from "../interfaces/MessageResponse"
import { z } from "zod"
import axios, { AxiosInstance } from "axios"
import qs from "qs"

let axiosManager: null | AxiosInstance = null

const router = express.Router()

// FIXME : Add a middleware-validator
router.post<{}, MessageResponse>("/", async (req, res, next) => {
  try {
    const username = z.string().parse(req.body.username)
    const password = z.string().parse(req.body.password)

    const accessToken = await getAccessTokenFromReddit({ username, password })
    axiosManager = axios.create({
      baseURL: "https://oauth.reddit.com",
      headers: {
        Cookie:
          "csv=2; edgebucket=KooH1ygarLUNgn2CXu; loid=0000000000slqa48vf.2.1663515658000.Z0FBQUFBQm5lODg4Tkw0Ui02X1FsSHhFZTVaY2tJYzk0d0RTMUFmQUIxd05nUzRrT09ocUhfa1ZCODhoVlpDa2V2ZGRHZVQ4ZTJNQXJMTmNTXy1DTnVHVkEtMzdZeVVZb3ZWUlczQk92Nk5DcF9QS0c4X1Z1VFkxX0JkOVZFTERWMW44YzAyZnhCcmo",
        Authorization: `bearer ${accessToken}`
      }
    })

    res.json({
      message: "API - Axios manager is ready to use ✅"
    })
  } catch (e) {
    next(e)
  }
})

export async function getAccessTokenFromReddit({
  username,
  password
}: {
  username: string
  password: string
}) {
  // FIXME: Don't commit this to .env
  const data = qs.stringify({ grant_type: "password", username, password })

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://www.reddit.com/api/v1/access_token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic dlBvbjZkMl9qNkJCdEJ4dkVLUURTUTpXQ05JdlBNRVF6N2dpeHJ5Ung2cjR5YWE3WjlIaXc=",
      Cookie:
        "csv=2; edgebucket=KooH1ygarLUNgn2CXu; loid=0000000000slqa48vf.2.1663515658000.Z0FBQUFBQm5lODg4Tkw0Ui02X1FsSHhFZTVaY2tJYzk0d0RTMUFmQUIxd05nUzRrT09ocUhfa1ZCODhoVlpDa2V2ZGRHZVQ4ZTJNQXJMTmNTXy1DTnVHVkEtMzdZeVVZb3ZWUlczQk92Nk5DcF9QS0c4X1Z1VFkxX0JkOVZFTERWMW44YzAyZnhCcmo"
    },
    data: data
  }

  const response = await axios.request(config)
  return z.string().parse(response.data.access_token)
}

export { axiosManager }
export default router
