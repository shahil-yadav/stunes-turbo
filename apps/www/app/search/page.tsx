import { LibrarySongs } from "@/app/library/library-song";

export default function Page() {
  // TODO Display Fav Section here
  return (
    <div className="mt-5">
      <span className="text-lg font-bold">Previously Played Songs</span>
      <LibrarySongs LIMIT={5} />
    </div>
  );
}
