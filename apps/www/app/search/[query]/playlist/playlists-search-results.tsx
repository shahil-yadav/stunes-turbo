import { fetchPlaylistByQuery } from "@/app/search/[query]/playlist/fetch-playlist-by-query";
import { HorizontalScrollableContainer } from "@/components/horizontal-cards/horizontal-scrollable-container";
import { ListRoundCard } from "@/components/horizontal-cards/ui-cards";

export async function PlaylistsSearchResults(props: {
  query: string;
  limit?: number;
}) {
  const playlists = await fetchPlaylistByQuery(props.query);
  if (playlists.length === 0) return <p>No playlist found</p>;

  return (
    <HorizontalScrollableContainer title="Playlists">
      {playlists.slice(0, props.limit).map((album) => (
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
  );
}
