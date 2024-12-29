"use client";

import { Heart, History } from "lucide-react";
import Link from "next/link";

import { FavouriteSongs } from "@/app/favourites/favourite-songs";
import { LibrarySongs } from "@/app/library/library-song";
import { Button } from "@/components/ui/button";
import {
  selectFavouriteSongIds,
  selectHistorySongIds,
} from "@/lib/redux/controls-slice";
import { useAppSelector } from "@/lib/redux/hooks";

export default function Page() {
  const favouriteSongIds = useAppSelector(selectFavouriteSongIds);
  const historySongIds = useAppSelector(selectHistorySongIds);

  return (
    <div className="space-y-5 pb-10">
      <div className="flex gap-x-2">
        <Button variant="outline">
          <Link href="/history" className="flex">
            <History className="mr-2 size-5" /> History
          </Link>
        </Button>

        <Button variant="outline">
          <Link href="/favourites" className="flex">
            <Heart className="mr-2 size-5 fill-red-500 stroke-red-500" />{" "}
            Favourites
          </Link>
        </Button>
      </div>

      <div>
        <p className="text-3xl font-bold">Favourites</p>
        <FavouriteSongs LIMIT={3} />
        {favouriteSongIds.length > 3 && (
          <Link className="text-lg" href="/favourites">
            View all favourites
          </Link>
        )}
      </div>

      <div>
        <p className="text-3xl font-bold">Recently Played</p>
        <LibrarySongs LIMIT={5} />
        {historySongIds.length > 5 && (
          <Link className="text-lg" href="/history">
            View all history
          </Link>
        )}
      </div>
    </div>
  );
}
