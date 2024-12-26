import { fetchSongsByQuery } from "@/app/search/[query]/song/fetch-songs-by-query";
import { ListSongCard } from "@/components/horizontal-cards/list-song-card";

export async function SongsSearchResults(props: {
  query: string;
  limit?: number;
}) {
  const songs = await fetchSongsByQuery(props.query);
  if (songs.length === 0) return <p>No songs found</p>;

  return songs
    .slice(0, props.limit)
    .map((song) => (
      <ListSongCard
        songImageUrl={song.songImageUrl}
        key={song.songId}
        songId={song.songId}
        url={song.url}
        label={song.label}
        duration={song.duration}
        artistsImages={song.artistsImages}
      />
    ));
}
