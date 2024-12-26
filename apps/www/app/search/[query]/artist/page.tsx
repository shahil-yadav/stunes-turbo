import { redirect } from "next/navigation";

import { ArtistsSearchResults } from "@/app/search/[query]/artist/artists-search-results";

interface Params {
  params?: Promise<{ query: string }>;
}

export default async function Page(props: Params) {
  const params = await props.params;
  if (!params?.query) redirect("/search");

  return <ArtistsSearchResults query={params.query} />;
}
