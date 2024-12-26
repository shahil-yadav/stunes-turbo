import { redirect } from "next/navigation";
import React from "react";

import { TopQuery } from "@/app/search/[query]/all/top-query";
import { ArtistsSearchResults } from "@/app/search/[query]/artist/artists-search-results";
import { PlaylistsSearchResults } from "@/app/search/[query]/playlist/playlists-search-results";
import { SongsSearchResults } from "@/app/search/[query]/song/songs-search-results";

interface Params {
  params?: Promise<{ query: string }>;
}

export default async function Page(props: Params) {
  const params = await props.params;
  if (!params?.query) redirect("/search");

  return (
    <div className="space-y-5">
      <TopQuery query={params.query} />
      <div>
        <p className="text-3xl font-semibold">Songs</p>
        <SongsSearchResults query={params.query} limit={3} />
      </div>
      <PlaylistsSearchResults query={params.query} limit={5} />
      <ArtistsSearchResults query={params.query} limit={5} />
    </div>
  );
}
