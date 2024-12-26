import { z } from "zod";

import { BASE_URL } from "@/lib/constants";

export const homepageSchema = z
  .object({
    title: z.string(),
    data: z
      .object({
        type: z.string(),
        id: z.string(),
        title: z.string(),
        image: z.string(),
      })
      .array(),
  })
  .array();

export async function fetchHomepage() {
  const response = await fetch(`${BASE_URL}/homepage`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch homepage section " + response.status);
  }

  const { data } = (await response.json()) as {
    data: z.infer<typeof homepageSchema>;
  };

  const parsedResults = homepageSchema.safeParse(data);

  if (!parsedResults.success) {
    throw new Error(parsedResults.error.toString());
  }

  return parsedResults.data;
}
