"use client"

import {useAppSelector} from "@/lib/redux/hooks";
import {selectHistorySongIds} from "@/lib/redux/controls-slice";
import useSWRImmutable from "swr/immutable";
import {fetchUserLikedSongIds} from "@/app/artist/fetch-user-liked-artist-songs";
import {LibrarySong} from "@/app/library/library-song";

export function RecommendedArtistSongsBaseOnClientHistory({artistId}: {artistId: string;}) {
  const songIds = useAppSelector(selectHistorySongIds);
  const swr = useSWRImmutable({ songIds, artistId },fetchUserLikedSongIds);

  
  if (swr.isLoading) return "Getting your most listened songs from this artist";
  if(swr.error) {
      console.error(swr.error);
    return "Error Getting the music recommendations";
  }
  return swr.data && <UserFavouriteArtistSongs songIds={swr.data} />;
}

function UserFavouriteArtistSongs(props:{songIds:string[]}){
    return (props.songIds.map(songId=>(
        <LibrarySong key={songId} songId={songId} />
    )))    
}
