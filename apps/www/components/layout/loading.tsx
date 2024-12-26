import Image from "next/image";

export function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Image
        width={200}
        height={200}
        className="object-cover"
        src="/loading.webp"
        alt="loading"
      />
    </div>
  );
}
