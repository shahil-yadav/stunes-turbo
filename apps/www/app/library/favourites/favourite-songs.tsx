"use client";

import { LibrarySong } from "@/app/library/library-song";
import { selectFavouriteSongIds } from "@/lib/redux/controls-slice";
import { useAppSelector } from "@/lib/redux/hooks";

export function FavouriteSongs(props: { LIMIT?: number }) {
  const songIds = useAppSelector(selectFavouriteSongIds);
  if (songIds.length === 0)
    return <p>You haven&#39;t made any song favourite currently</p>;
  return (
    <div>
      {songIds.slice(0, props.LIMIT).map((songId) => (
        <LibrarySong key={songId} songId={songId} />
      ))}
    </div>
  );
}
