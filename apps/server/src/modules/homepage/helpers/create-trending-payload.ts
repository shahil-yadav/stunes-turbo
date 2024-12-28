export function createTrendingPayload(data: any) {
  const formattedData = data.map((item: any) => ({
    type: item?.type,
    id: item?.id,
    title: item?.title,
    image: item?.image
  }))

  const payload = [
    {
      title: 'Trending',
      data: formattedData
    }
  ]

  return payload
}
