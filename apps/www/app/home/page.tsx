import { Suspense } from "react"
import { fetchHomepage } from "@/app/home/fetch-homepage"
import {
  MultipleCardHorizontalSkeletonList,
  SingleHorizontalCard
} from "@/components/horizontal-cards/ui-cards"
import { Info } from "@/app/home/info"

export default async function Page() {
  return (
    <div className="space-y-5">
      <Info />
      <Suspense fallback={<MultipleCardHorizontalSkeletonList />}>
        <HomepageSongs />
      </Suspense>
    </div>
  )
}

async function HomepageSongs() {
  const data = await fetchHomepage()

  return data.map((item) => (
    <div key={item.title}>
      <p className="text-lg font-medium">{item.title}</p>
      <div className="">
        {item.data.map((entry) => (
          <SingleHorizontalCard
            key={entry.id}
            id={entry.id}
            imgSrc={entry.image}
            imgAlt={entry.title}
            title={entry.title}
            type={entry.type}
          />
        ))}
      </div>
    </div>
  ))
}

/* export default function Page() {
    const historyStore = useAppSelector(
        (state) => state["player-controls"].history,
    );

    const normalCollection: LinkCollectionCardProps = historyStore
        // .filter((val) => val.listenCount < FAVOURITE_COUNT)
        .map((val) => ({
            name: val.song.name,
            id: val.song.id.song,
            src: val.song.artwork.slice(selectedImageIndex)[0].src,
            type: "song",
        }));

    return (
        <>
            <div className="h-[52px]" />
            <Separator className="mb-4" />
            <ScrollArea className="mx-2 xs:mx-10 h-screen pb-32">
                <H1 className="mb-5">Pick up where you left off</H1>
                <LinkCollectionCard collections={normalCollection} />
            </ScrollArea>
        </>
    );
}
*/
