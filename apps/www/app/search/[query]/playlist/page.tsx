import { redirect } from "next/navigation";

import { PlaylistsSearchResults } from "@/app/search/[query]/playlist/playlists-search-results";

interface Params {
  params?: Promise<{ query: string }>;
}

export default async function Page(props: Params) {
  const params = await props.params;
  if (!params?.query) redirect("/search");
  return <PlaylistsSearchResults query={params.query} />;
}
