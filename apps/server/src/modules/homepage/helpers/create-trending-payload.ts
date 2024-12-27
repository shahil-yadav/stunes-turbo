import { filterAlbumSongsPlaylist } from '#modules/homepage/helpers/filter-album-songs-playlist'

export function createTrendingPayload(data: any) {
  const formattedData = data.map((item: any) => ({
    title: item?.title,
    data: item?.data.filter(filterAlbumSongsPlaylist).map((entry: any) => ({
      type: entry?.type,
      id: entry?.id,
      title: entry?.title?.text,
      image: entry?.image[0]
    }))
  }))
  return formattedData
}
