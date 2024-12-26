"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { Input } from "@/components/ui/input";

export default function Layout(props: { children: Readonly<React.ReactNode> }) {
  const [query, setQuery] = React.useState<string>();
  const router = useRouter();

  React.useEffect(() => {
    if (query) router.replace(`/search/${query}/all`);
    else router.replace("/search");
  }, [query]);

  return (
    <div>
      <div className="my-2">
        <div className="flex items-center">
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
          <Link href={`/search/${query}/all`}>All</Link>
          <Link href={`/search/${query}/song`}>Songs</Link>
          <Link href={`/search/${query}/album`}>Albums</Link>
          <Link href={`/search/${query}/artist`}>Artists</Link>
          <Link href={`/search/${query}/playlist`}>Playlists</Link>
        </div>
      )}
      {props.children}
    </div>
  );
}
