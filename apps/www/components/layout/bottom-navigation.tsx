"use client";

import { Dot } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const pathname = usePathname();
  const navItems = [
    {
      label: "Home",
      href: "/home",
    },

    {
      label: "Search",
      href: "/search#search",
    },
    {
      label: "Library",
      href: "/library",
    },
  ];
  const isActive = (link: string) => pathname.startsWith(link);

  return (
    <div className="flex justify-around bg-gray-300 pb-7 pt-2 uppercase text-gray-500">
      {navItems.map((item) => (
        <Link
          className={cn(isActive(item.href) && "text-foreground")}
          href={item.href}
          key={item.href}
        >
          <div className="flex flex-col items-center">
            <span>{item.label}</span>
            {isActive(item.href) && <Dot size={15} strokeWidth={7} />}
          </div>
        </Link>
      ))}
    </div>
  );
}
