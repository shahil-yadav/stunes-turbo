"use client";

import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// FIXME Add "Why did I create this website"
export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const isAtHomeRoute = pathname === "/home";

  return (
    <div className="flex items-center font-bold justify-between px-2 py-4">
      {isAtHomeRoute ? (
        <p>Welcome to stunes</p>
      ) : (
        <button onClick={() => router.back()}>
          <ArrowLeft />
        </button>
      )}
      <Link href="https://stunes-turbo-blog.vercel.app/">
        <Info className="size-5 text-gray-500" />
      </Link>
    </div>
  );
}
