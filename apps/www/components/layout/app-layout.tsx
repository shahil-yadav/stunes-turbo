import { BottomNavigation } from "@/components/layout/bottom-navigation"
import { Header } from "@/components/layout/header"
import { DrawerMusicPlayer } from "@/components/music-players/drawer-music-player"
import { Search } from "@/app/search/search-bar"

export function AppLayout({ children }: { children: Readonly<React.ReactNode> }) {
  return (
    <main className="mx-auto flex h-svh max-w-md flex-col">
      <Header />

      <Search />
      <div className="grow px-2 overflow-y-scroll">{children}</div>

      <DrawerMusicPlayer />
      <BottomNavigation />
    </main>
  )
}
