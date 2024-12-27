import { AlbumController, ArtistController, HomepageController, SearchController, SongController } from '#modules/index'
import { PlaylistController } from '#modules/playlists/controllers'
import { App } from './app'

const app = new App([
  new SearchController(),
  new SongController(),
  new AlbumController(),
  new ArtistController(),
  new PlaylistController(),
  new HomepageController()
]).getApp()

export default {
  port: 4320,
  fetch: app.fetch
}
