interface HorizontalScrollableContainerProps {
  children: Readonly<React.ReactNode>;
  title: string;
}

export function HorizontalScrollableContainer(
  props: HorizontalScrollableContainerProps,
) {
  return (
    <div className="mb-2 space-y-3">
      <p className="text-3xl">{props.title}</p>
      <div className="no-scrollbar w-full  overflow-y-scroll whitespace-nowrap">
        <div className="flex w-max space-x-0.5">{props.children}</div>
      </div>
    </div>
  );
}
