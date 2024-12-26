import { redirect } from "next/navigation";

import { fetchArtist } from "@/app/artist/data/fetch-artist";
import { DisplayImageCard } from "@/components/horizontal-cards/display-image-card";
import { HorizontalScrollableContainer } from "@/components/horizontal-cards/horizontal-scrollable-container";
import { ListSongCard } from "@/components/horizontal-cards/list-song-card";
import { ListRoundCard } from "@/components/horizontal-cards/ui-cards";

type SearchParams = Promise<{
  id?: string;
  // songs_page?: string
  // albums_page?: string
}>;

export default async function Page(props: { searchParams?: SearchParams }) {
  const searchParams = await props.searchParams;
  if (!searchParams?.id) redirect("/");

  const data = await fetchArtist(searchParams.id);

  return (
    <>
      <DisplayImageCard imageSrc={data.info.imgSrc} alt={data.info.name} />
      <div>
        <p className="text-3xl">Songs</p>
        {data.songs.map((song) => (
          <ListSongCard
            key={song.songId}
            songId={song.songId}
            url={song.url}
            label={song.label}
            duration={song.duration}
            artistsImages={song.artistsImages}
          />
        ))}
      </div>
      <HorizontalScrollableContainer title="Albums">
        {data.albums.map((album) => (
          <ListRoundCard
            key={album.id}
            type={album.type}
            id={album.id}
            imgSrc={album.imgSrc}
            imgAlt={album.title}
            title={album.title}
          />
        ))}
      </HorizontalScrollableContainer>
      <HorizontalScrollableContainer title="Singles">
        {data.singles.map((singles) => (
          <ListRoundCard
            key={singles.id}
            type={singles.type}
            id={singles.id}
            imgSrc={singles.imgSrc}
            imgAlt={singles.title}
            title={singles.title}
          />
        ))}
      </HorizontalScrollableContainer>
    </>
  );
}
