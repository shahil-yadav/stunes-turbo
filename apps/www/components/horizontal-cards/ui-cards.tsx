"use client";

import parse from "html-react-parser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Skeleton } from "@/components/ui/skeleton";
import { cn, prettySeconds } from "@/lib/utils";

interface ListRoundCardProps {
  id: string;
  imgSrc: string;
  imgAlt: string;
  type: string;
  title: string;
}

export function ListRoundCard(props: ListRoundCardProps) {
  const router = useRouter();

  function handleCsrNavigate() {
    router.push(`/${props.type}?id=${props.id}`);
  }

  return (
    <div
      onClick={handleCsrNavigate}
      className="inline-block w-40 max-w-40 bg-gray-100 px-2 pb-6 pt-4 text-center"
    >
      <p className="truncate pb-8 text-center italic">{props.title}</p>
      <div className="overflow-hidden rounded-full border border-white">
        <img className="object-cover" src={props.imgSrc} alt={props.imgAlt} />
      </div>
    </div>
  );
}

export const SingleHorizontalCardSchema = z.object({
  imgSrc: z.string(),
  imgAlt: z.string(),
  title: z.string(),
  id: z.string(),
  type: z.string(),
  year: z.union([z.string(), z.number()]).optional(),
  duration: z.number().optional(),
});

type SingleHorizontalCardProps = z.infer<typeof SingleHorizontalCardSchema>;

export function SingleHorizontalCard(props: SingleHorizontalCardProps) {
  const router = useRouter();

  function handleCsrNavigate() {
    router.push(`${props.type}?id=${props.id}`);
  }

  return (
    <div
      onClick={handleCsrNavigate}
      className="flex min-w-64 cursor-pointer items-center gap-3 border-b-2 border-dotted px-2 py-2"
    >
      <img
        className="size-20 object-cover"
        src={props.imgSrc}
        alt={props.imgAlt}
      />
      <div className="grow space-y-4">
        <div>
          <p className="">{parse(props.title)}</p>
          <p className="text-gray-500">{props.type}</p>
        </div>
        <div className="space-x-5 text-gray-500">
          {props.duration && <span>{prettySeconds(props.duration)}</span>}
          <span>{props.year}</span>
        </div>
      </div>
      <div className="self-end text-gray-500">
        <Link href={`${props.type}?id=${props.id}`}>MORE</Link>
      </div>
    </div>
  );
}

export function SingleSkeletonHorizontalCard() {
  return (
    <div className="flex min-w-64 cursor-pointer items-center gap-3 border-b-2 border-dotted px-2 py-2">
      <Skeleton className="size-20" />
      <div className="grow space-y-9">
        <div className="space-y-2">
          <Skeleton className="h-3" />
          <Skeleton className="h-3" />
        </div>
        <div className="flex space-x-5 text-gray-500">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
      <div className="self-end text-gray-500">
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  );
}

export function SingleErrorHorizontalCard() {
  return (
    <div className="flex min-w-64 cursor-pointer items-center gap-3 border-b-2 border-dotted px-2 py-2">
      <img
        className="size-20 object-cover"
        src="/error-card.webp"
        alt="error"
      />
      <div className="grow space-y-9">
        <div className="space-y-2">
          <Skeleton className="h-3" />
          <p className="text-red-600">Failed to retrieve ⚠️</p>
        </div>
        <div className="flex space-x-5 text-gray-500">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
      <div className="self-end text-gray-500">
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  );
}

interface MultipleCardHorizontalSkeletonListProps {
  count?: number;
  scrollable?: boolean;
}

export function MultipleCardHorizontalSkeletonList({
  count = 10,
  scrollable = true,
}: MultipleCardHorizontalSkeletonListProps) {
  const array = Array.from({ length: count });
  return (
    <div className={cn(!scrollable && "h-full overflow-hidden")}>
      {array.map((__, it) => (
        <SingleSkeletonHorizontalCard key={it} />
      ))}
    </div>
  );
}
