import { redirect } from "next/navigation";

import { fetchAlbumsByQuery } from "@/app/search/[query]/album/fetch-albums-by-query";
import { HorizontalScrollableContainer } from "@/components/horizontal-cards/horizontal-scrollable-container";
import { ListRoundCard } from "@/components/horizontal-cards/ui-cards";

interface Params {
  params?: Promise<{ query: string }>;
}

export default async function Page(props: Params) {
  const params = await props.params;
  if (!params?.query) redirect("/search");

  const albums = await fetchAlbumsByQuery(params.query);
  if (albums.length === 0) return <p>No albums found</p>;

  return (
    <HorizontalScrollableContainer title="Albums">
      {albums.map((album) => (
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
