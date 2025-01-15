import express from "express"
import MessageResponse from "../interfaces/MessageResponse"
import emojis from "./emojis"
import auth from "./auth"
import me from "./me"
import comments from "./comments"
import posts from "./posts"
import profile from "./profile"

const router = express.Router()

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏"
  })
})

router.use("/emojis", emojis)
router.use("/auth", auth)
router.use("/me", me)
router.use("/comments", comments)
router.use("/posts", posts)
router.use("/profile", profile)

export default router
