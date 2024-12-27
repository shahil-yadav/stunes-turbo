export function filterAlbumSongsPlaylist(data: any) {
  if (['album', 'playlist', 'song'].includes(data?.type)) {
    return true
  } else {
    return false
  }
}
