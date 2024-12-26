import { FavouriteSongs } from "@/app/library/favourites/favourite-songs";

export default function Page() {
  return (
    <div>
      <p className="text-3xl font-bold">Favourites</p>
      <FavouriteSongs />
    </div>
  );
}
