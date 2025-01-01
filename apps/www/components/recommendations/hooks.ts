import {
  selectActiveSongIndex,
  selectPlaylistSongs,
} from "@/lib/redux/controls-slice";
import { useAppSelector } from "@/lib/redux/hooks";

/**
 * Doesn't need to add songs if the playlist is of length (10)
 * Add the first top 3 of every songs
 * Don't include song which he has already listened to
 * */
export function useEnableAiMusicRecommendations() {
  const playlistSongs = useAppSelector(selectPlaylistSongs);
  const activeSongIndex = useAppSelector(selectActiveSongIndex);
  return playlistSongs.length - activeSongIndex < 5;
}

export function useGetSongIdFromReduxSongsPlaylist() {
  const playlistSongs = useAppSelector(selectPlaylistSongs);
  const playlistSongsLength = playlistSongs.length;
  const luckyIndex = Math.random() * (playlistSongsLength - 1);
  return playlistSongs.at(luckyIndex)?.songId;
}
