"use client";

import * as React from "react";

import { PrimaryMusicPlayer } from "@/components/music-players/primary-music-players";
import { SecondaryMusicPlayer } from "@/components/music-players/secondary-music-player";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

export function DrawerMusicPlayer() {
  const [openDrawer, setOpenDrawerDrawer] = React.useState(false);

  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawerDrawer}>
      <SecondaryMusicPlayer setOpenDrawer={setOpenDrawerDrawer} />
      <DrawerContent>
        <div className="flex h-[70svh] items-center px-3">
          <PrimaryMusicPlayer />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
