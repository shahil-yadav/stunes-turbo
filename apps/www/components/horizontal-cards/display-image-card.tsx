interface DisplayImageCardProps {
  imageSrc: string;
  alt: string;
}

export function DisplayImageCard(props: DisplayImageCardProps) {
  return (
    <>
      <div className="relative">
        <p className="text-3xl font-bold">{props.alt}</p>
        <img
          className="aspect-[1/1.5] h-[50svh] w-full object-cover"
          src={props.imageSrc}
          alt={props.alt}
        />
        <div className="absolute bottom-0 left-0 right-0 text-center font-extrabold">
          {/*<p className="text-4xl italic text-white ">{props.alt}</p>*/}
          {/*<p className="text-4xl text-white">{data.album.desc}</p>*/}
        </div>
      </div>
    </>
  );
}
