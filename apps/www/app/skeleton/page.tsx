import { MultipleCardHorizontalSkeletonList } from "@/components/horizontal-cards/ui-cards";

export default function Page() {
  // return <Loading />

  return <MultipleCardHorizontalSkeletonList scrollable={false} count={10} />;
}
