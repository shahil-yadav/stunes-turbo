"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

import { Input } from "@/components/ui/input";

function useEnableAtPath(path: string) {
  const pathname = usePathname();
  let isEnabled = false;
  if (pathname.startsWith(path)) {
    isEnabled = true;
  }
  return isEnabled;
}

function useGetActiveStateFromPath() {
  const pathname = usePathname();
  const stateSchema = z.union([
    z.literal("song"),
    z.literal("album"),
    z.literal("playlist"),
    z.literal("artist"),
    z.literal("all"),
  ]);
  /* Trick to preserve the state from url */
  const state =
    pathname.split("/").length === 4 ? pathname.split("/").at(-1) : "all";

  const parsedResults = stateSchema.safeParse(state);
  if (!parsedResults.success)
    throw new Error("Zod states are not in sync with search bar");

  return parsedResults.data;
}

export function SearchBar() {
  const [query, setQuery] = React.useState<string>();
  const router = useRouter();
  const activeSearchState = useGetActiveStateFromPath();
  const isSearchEnabled = useEnableAtPath("/search");

  React.useEffect(() => {
    if(!isSearchEnabled) return;

    if (query) router.replace(`/search/${query}/${activeSearchState}`);
    else router.replace("/search");
  }, [query]);

  return (
    isSearchEnabled && (
      <div className="px-2">
        <div id="search-bar" className="my-2">
          <div className="flex top-2 items-center">
            <div className="flex size-10 items-center justify-center border border-r-0">
              <Search className="size-5" />
            </div>
            <Input
              className="rounded-none border-l-0"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder={"Search song, playlist and album"}
            />
          </div>
        </div>
        {query && (
          <div className="no-scrollbar mb-5 flex gap-4 overflow-x-scroll bg-gray-300 p-4">
            <Link href={`/search/${query}/all`}>
              <ActiveInactiveLink
                actve={"all" === activeSearchState}
                text={"All"}
              />
            </Link>
            <Link href={`/search/${query}/song`}>
              <ActiveInactiveLink
                actve={"song" === activeSearchState}
                text={"Songs"}
              />
            </Link>
            <Link href={`/search/${query}/album`}>
              <ActiveInactiveLink
                actve={"album" === activeSearchState}
                text={"Albums"}
              />
            </Link>
            <Link href={`/search/${query}/artist`}>
              <ActiveInactiveLink
                actve={"artist" === activeSearchState}
                text={"Artists"}
              />
            </Link>
            <Link href={`/search/${query}/playlist`}>
              <ActiveInactiveLink
                actve={"playlist" === activeSearchState}
                text={"Playlists"}
              />
            </Link>
          </div>
        )}
      </div>
    )
  );
}

function ActiveInactiveLink({
  actve = false,
  text,
}: {
  actve: boolean;
  text: string;
}) {
  if (actve) return <span>{text}</span>;
  return <span className="text-gray-500">{text}</span>;
}
