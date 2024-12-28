import React from "react";
import { z } from "zod";

import { fetchAlbumSongs } from "@/app/album/fetch-album-songs";
import { fetchArtist } from "@/app/artist/fetch-artist";
import { fetchPlaylistSongs } from "@/app/playlist/fetch-playlist-songs";
import { fetchSongs } from "@/app/song/fetch-songs";
import { ListSongCard } from "@/components/horizontal-cards/list-song-card";
import { ListRoundCard } from "@/components/horizontal-cards/ui-cards";
import { BASE_URL } from "@/lib/constants";

const ZodTopQuerySchema = z.object({
  id: z.string().optional(),
  type: z.string().optional(),
});

async function fetchTopQuery(query: string) {
  const response = await fetch(`${BASE_URL}/search?query=${query}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch songs by search query of ${query}, ${response.statusText}`,
    );
  }

  const { data } = await response.json();

  const topResult = data?.topQuery?.results?.at(0);
  const formattedData = {
    id: topResult?.id,
    type: topResult?.type,
  };

  const parsedResults = ZodTopQuerySchema.safeParse(formattedData);

  if (!parsedResults.success) throw new Error(parsedResults.error.toString());

  return parsedResults.data;
}

export async function TopQuery(props: { query: string }) {
  const query = await fetchTopQuery(props.query);
  if (!query?.id || !query?.type) return null;
  let Content: React.JSX.Element = <></>;

  if (query.type === "song") {
    const data = await fetchSongs(query.id);
    Content = (
      <>
        {data.songs.map((song) => (
          <ListSongCard
            songImageUrl={song.songImageUrl}
            songId={song.songId}
            url={song.url}
            key={song.label}
            label={song.label}
            duration={song.duration}
            artistsImages={song.artistsImages}
          />
        ))}
      </>
    );
  } else if (query.type === "album") {
    const data = await fetchAlbumSongs(query.id);
    Content = (
      <ListRoundCard
        type={query.type}
        id={query.id}
        imgSrc={data.album.imageSrc}
        imgAlt={data.album.name}
        title={data.album.name}
      />
    );
  } else if (query.type === "playlist") {
    const data = await fetchPlaylistSongs(query.id);
    Content = (
      <ListRoundCard
        type={query.type}
        id={query.id}
        imgSrc={data.album.imageSrc}
        imgAlt={data.album.name}
        title={data.album.name}
      />
    );
  } else if (query.type === "artist") {
    const artists = await fetchArtist(query.id);
    Content = (
      <ListRoundCard
        type={query.type}
        id={query.id}
        imgSrc={artists.info.imgSrc}
        imgAlt={artists.info.name}
        title={artists.info.name}
      />
    );
  }

  return (
    <div>
      <p className="text-3xl font-semibold">Top Query</p>
      {Content}
    </div>
  );
}
