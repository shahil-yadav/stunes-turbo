import { redirect } from "next/navigation";

import { fetchAlbumSongs } from "@/app/album/fetch-album-songs";
import { DisplayImageCard } from "@/components/horizontal-cards/display-image-card";
import { DisplaySongControls } from "@/components/horizontal-cards/display-song-controls";
import { ListSongCard } from "@/components/horizontal-cards/list-song-card";

type SearchParams = Promise<{ id: string }>;
export default async function Page(props: { searchParams?: SearchParams }) {
  const searchParams = await props.searchParams;
  if (!searchParams?.id) {
    redirect("/");
  }

  const data = await fetchAlbumSongs(searchParams.id);
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

/*
export default async function Page(
    props: {
        searchParams?: Promise<{ id?: string }>;
    }
) {
    const searchParams = await props.searchParams;
    if (!searchParams || !searchParams.id) return <H1>Albums Id is null</H1>;

    const collection = await fetchAlbums(searchParams.id);

    return (
        collection && (
            <ScrollArea className="h-screen pb-32">
                <div className="h-[52px]" />
                <Separator />
                <div className="m-5">
                    <CollectionCard
                        collection={{
                            img: collection.img,
                            name: collection.name,
                        }}
                    />
                    <CollectionSongs
                        collection={{
                            name: collection.name,
                            song: collection.song,
                        }}
                    />
                </div>
            </ScrollArea>
        )
    );
}
*/
