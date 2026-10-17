import data from "./pageMeta.json";

export type PageCopy = {
  title: string;
  description: string;
  h1: string;
  body: string;
};

/** Per-route title, description and headline. Also read by scripts/prerender.mjs. */
export const pageMeta: Record<string, PageCopy> = data;
