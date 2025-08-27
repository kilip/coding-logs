import { defineCollection, z } from "astro:content";

import { glob, file } from "astro/loaders";

const post = z.object({
  title: z.string(),
  published: z.coerce.date(),
  category: z.string(),
  tags: z.array(z.string()),
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./content",
  }),
  schema: post,
});

export const collections = { blog };
