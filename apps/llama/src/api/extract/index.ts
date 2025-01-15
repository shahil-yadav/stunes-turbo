import express from "express"
import { execute } from "./utils"
import { z } from "zod"

const router = express.Router()

router.post("/", async (req, res, next) => {
  try {
    const comment = z.string().parse(req.body.comment)
    const response = await execute(comment)
    res.json({
      message: response
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

export default router
