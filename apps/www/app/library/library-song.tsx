"use client";

import { useGetDetailsOfSongForLibrarySection } from "@/app/library/use-get-details-of-song";
import {
  SingleErrorHorizontalCard,
  SingleHorizontalCard,
  SingleSkeletonHorizontalCard,
} from "@/components/horizontal-cards/ui-cards";
import { selectHistorySongIds } from "@/lib/redux/controls-slice";
import { useAppSelector } from "@/lib/redux/hooks";

interface LibrarySongProps {
  songId: string;
}

export function LibrarySongs(props: { LIMIT?: number }) {
  const songIds = useAppSelector(selectHistorySongIds);
  if (songIds.length === 0)
    return (
      <p>
        Feel free to explore stunes more, your history section will appear here
      </p>
    );

  return (
    <div>
      {songIds.slice(0, props.LIMIT).map((songId) => (
        <LibrarySong key={songId} songId={songId} />
      ))}
    </div>
  );
}

export function LibrarySong({ songId }: LibrarySongProps) {
  const swr = useGetDetailsOfSongForLibrarySection(songId);

  if (swr.isLoading) return <SingleSkeletonHorizontalCard />;
  if (swr.error || swr.data === null) return <SingleErrorHorizontalCard />;

  return (
    <SingleHorizontalCard
      key={swr.data.imgSrc}
      imgSrc={swr.data.imgSrc}
      imgAlt={swr.data.imgAlt}
      title={swr.data.title}
      id={swr.data.id}
      type={swr.data.type}
      year={swr.data.year}
      duration={swr.data.duration}
    />
  );
}
