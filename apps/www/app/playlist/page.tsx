import { redirect } from "next/navigation";

import { fetchPlaylistSongs } from "@/app/playlist/data/fetch-playlist-songs";
import { DisplayImageCard } from "@/components/horizontal-cards/display-image-card";
import { DisplaySongControls } from "@/components/horizontal-cards/display-song-controls";
import { ListSongCard } from "@/components/horizontal-cards/list-song-card";

type SearchParams = Promise<{ id: string }>;
export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  if (!searchParams?.id) {
    redirect("/");
  }

  const data = await fetchPlaylistSongs(searchParams.id);
  return (
    <div>
      <DisplayImageCard imageSrc={data.album.imageSrc} alt={data.album.name} />
      <DisplaySongControls songs={data.songs} />
      {data.songs.map((song) => (
        <ListSongCard
          songId={song.songId}
          url={song.url}
          key={song.label}
          label={song.label}
          duration={song.duration}
          artistsImages={song.artistsImages}
        />
      ))}
    </div>
  );
}
