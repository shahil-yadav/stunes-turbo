import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { Header } from "@/components/layout/header";
import { DrawerMusicPlayer } from "@/components/music-players/drawer-music-player";

export function AppLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <main className="mx-auto flex h-svh max-w-md flex-col">
      <Header />
      <div className="grow overflow-y-scroll px-2">{children}</div>
      <DrawerMusicPlayer />
      <BottomNavigation />
    </main>
  );
}
