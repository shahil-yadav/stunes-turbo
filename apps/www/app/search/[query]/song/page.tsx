import { redirect } from "next/navigation";

import { SongsSearchResults } from "@/app/search/[query]/song/songs-search-results";

interface Params {
  params?: Promise<{ query: string }>;
}

export default async function Page(props: Params) {
  const params = await props.params;
  if (!params?.query) redirect("/search");
  return <SongsSearchResults query={params.query} />;
}
