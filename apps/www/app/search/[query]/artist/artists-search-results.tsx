import { fetchArtistsByQuery } from "@/app/search/[query]/artist/fetch-artists-by-query";
import { HorizontalScrollableContainer } from "@/components/horizontal-cards/horizontal-scrollable-container";
import { ListRoundCard } from "@/components/horizontal-cards/ui-cards";

export async function ArtistsSearchResults(props: {
  query: string;
  limit?: number;
}) {
  const artists = await fetchArtistsByQuery(props.query);
  if (artists.length === 0) return <p>No artist found</p>;

  return (
    <HorizontalScrollableContainer title="Artists">
      {artists.slice(0, props.limit).map((album) => (
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
