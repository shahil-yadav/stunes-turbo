import ollama from "ollama"
import { PROMPT_TEMPLATE } from "./constants"
import { z } from "zod"
import { zodToJsonSchema } from "zod-to-json-schema"

const FormatSchema = z.object({
  results: z.string().array(),
  links: z.string().array()
})

export async function execute(comment: string) {
  const MODEL_NAME = "mistral"
  const content = PROMPT_TEMPLATE.replace(/{{input_text}}/, comment)
  const generateResponse = await ollama.generate({
    model: MODEL_NAME,
    prompt: content,
    format: zodToJsonSchema(FormatSchema)
  })
  // return generateResponse.response
  return FormatSchema.parse(JSON.parse(generateResponse.response))
}
