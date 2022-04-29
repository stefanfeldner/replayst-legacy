import { Game } from "./Game";

export interface User {}

export interface UserContextValue {
  toRender: [Game[], Function],
  rendered: [String, Function],
  owned: [Game[], Function],
  wishlist: [Game[], Function],
  favorites: [Game[], Function],
  ownedIds: String[],
  wishIds: String[],
  favsIds: String[]
}