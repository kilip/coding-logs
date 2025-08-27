import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";

export async function getPosts() {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
  );

  return posts;
}

export function createExcerpt(body?: string) {
  if (!body) {
    return "";
  }
  const parser = new MarkdownIt();
  return parser
    .render(body)
    .split("\n")
    .slice(0, 6)
    .map((str) => {
      return str.replace(/<\/?[^>]+(>|$)/g, "").split("\n");
    })
    .flat()
    .join(" ")
    .substring(0, 200);
}
